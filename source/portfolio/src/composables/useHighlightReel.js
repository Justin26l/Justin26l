import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { provideSnapTargets } from './useSmoothScroll.js'

/**
 * Scroll engine for the highlight reel.
 *
 * One rAF-throttled handler computes progress `p` for each track and writes CSS
 * custom properties. Nothing here mutates layout — only transform, opacity and
 * colour — so the whole reel stays on the compositor.
 *
 * Progress contract (mirrors the design notes in HighlightReel.vue):
 *   p 0.00–0.20  ENTER   card rests small, editorial caption + corner brackets
 *   p 0.20–0.70  GROW    scale up, caption out, vignette in
 *   p 0.52–0.78  DETAIL  HUD rises with year, tech, impact fact and links
 *
 * A fullscreen card does NOT fade on the way out. It stays fully opaque and the
 * sticky release carries it up out of the viewport while the next track rises
 * behind it, so scrolling past a highlight never dims it.
 *
 * The same `p` also steps the project's photo set, so one downward scroll both
 * grows the card and advances its media.
 *
 * A media item may be a looping video. Playback is not a CSS concern, so this
 * engine owns it: the clip for the frame that is actually on screen in the
 * active track plays, every other clip is paused, and under reduced motion all
 * of them stay paused on their first frame behind native controls.
 *
 * TRACK ROLES
 *   The reel is a fullscreen gallery with bookends. Only the two ends have a
 *   scroll runway: the first card is resting when the reel opens and grows into
 *   place, the last one settles back to a resting card as the reel hands off to
 *   the light band. Every track between them is a plain fullscreen panel with no
 *   travel at all, so it only slides, and the page snap points line up on it.
 *
 *   The settle track is the grow track read backwards, so it reuses the exact
 *   same windows with `q = 1 - p` instead of `p`. That keeps the two ends true
 *   mirrors and leaves only one set of timings to tune.
 */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
/* smoothstep — an S-curve, so the grow has a soft start and a soft settle */
const smooth = t => {
  t = clamp(t, 0, 1)
  return t * t * (3 - 2 * t)
}
/* normalised position of p inside the window [a, b] */
const win = (p, a, b) => smooth((p - a) / (b - a))

/**
 * Progress windows, as fractions of a bookend track's travel. These are
 * constrained by geometry rather than taste: the card is parked to the right at
 * rest and grows across the gutter, so the order below is what keeps it from
 * crossing the other furniture on the way.
 */
const W = {
  grow: [0.2, 0.7],
  copyOut: [0.13, 0.37],
  dotsIn: [0.46, 0.68],
  mediaStep: [0.14, 0.9],
  brackets: [0.2, 0.46],
}

/**
 * What a track does as the page scrolls past it.
 *
 *   grow   the reel's opening card: resting, then scaling up to fullscreen
 *   full   a fullscreen panel with no travel — it only slides into place
 *   settle the reel's closing card: fullscreen, then shrinking back to rest
 *
 * A one-highlight reel is a single grow track; it never needs a bookend pair.
 */
export function trackMode(i, n) {
  if (n < 2) return 'grow'
  if (i === 0) return 'grow'
  if (i === n - 1) return 'settle'
  return 'full'
}

export function useHighlightReel(rootRef, highlights) {
  const reduced = ref(false)
  const hudOn = ref(false)
  const activeIndex = ref(0)
  const mediaIndex = reactive(highlights.map(() => 0))

  /* a manual dot click holds its frame until the scroll moves to a different one */
  const manual = highlights.map(() => null)
  const manualAt = highlights.map(() => null)
  const scrollIdx = highlights.map(() => 0)

  let tracks = []
  let clips = []
  let ticking = false
  let lastActive = -1
  let mq = null

  function collect() {
    const root = rootRef.value
    if (!root) return
    tracks = [...root.querySelectorAll('.hl-track')].map((el, i) => ({
      el,
      i,
      stage: el.querySelector('.hl-stage'),
      /* resolved once here rather than per frame: a shot is a still or a clip */
      shots: [...el.querySelectorAll('.hl-shot')].map(shot => ({
        el: shot,
        video: shot.querySelector('video'),
      })),
    }))
    clips = tracks.flatMap(t => t.shots.map(s => s.video).filter(Boolean))
  }

  /**
   * One clip plays at a time: the shot that is on screen, in the track the reel
   * is centred on. Everything else rests. `play()` is promise-returning and
   * rejects outright when a browser refuses autoplay, which is not an error
   * worth surfacing — the frame simply stays on its poster-wash still.
   */
  function syncVideo() {
    if (reduced.value) {
      clips.forEach(v => !v.paused && v.pause())
      return
    }
    tracks.forEach(t => {
      t.shots.forEach((s, si) => {
        if (!s.video) return
        const on = t.i === activeIndex.value && mediaIndex[t.i] === si
        if (on && s.video.paused) s.video.play().catch(() => {})
        else if (!on && !s.video.paused) s.video.pause()
      })
    })
  }

  /* the resting geometry is authored purely in CSS (and overridden per
     breakpoint), so nothing here needs to read it back */

  function render() {
    if (!tracks.length) return
    const root = rootRef.value
    if (!root) return
    const vh = window.innerHeight

    /* Which track the reel is centred on, and whether it is on screen at all.
       Both are needed even under reduced motion, where none of the custom
       properties below are written: the HUD is one fixed panel now, so if this
       stopped running in that mode the panel would keep naming whichever project
       it happened to start on, however far the reader scrolled. */
    let active = 0
    tracks.forEach((t, i) => {
      const rect = t.el.getBoundingClientRect()
      if (rect.top <= vh * 0.5 && rect.bottom > vh * 0.5) active = i
    })
    if (active !== lastActive) {
      lastActive = active
      activeIndex.value = active
    }

    /* root IS .hl-reel: querying for it inside itself can only ever return null,
       which is what this did before, so the gate never opened once. Measured
       then: at three points across the reel the HUD's class was plain, opacity 0. */
    const r = root.getBoundingClientRect()
    hudOn.value = r.top < vh * 0.6 && r.bottom > vh * 0.4

    if (reduced.value) {
      syncVideo()
      return
    }

    const hudFade = []

    tracks.forEach(t => {
      const rect = t.el.getBoundingClientRect()
      const stageH = t.stage.offsetHeight || vh
      const p = clamp(-rect.top / Math.max(1, rect.height - stageH), 0, 1)
      const st = t.stage.style

      /* A fullscreen panel has no runway, so its progress is not a position —
         it is pinned at the state a grown card ends in. The settle track is the
         grow track read backwards, so it runs the same windows off 1 - p. */
      const mode = trackMode(t.i, tracks.length)
      const q = mode === 'settle' ? 1 - p : mode === 'full' ? 1 : p

      /* ONE unitless number drives all of the card's responsive geometry.
         Scale, offset and radius are computed in CSS from --tg plus the tokens
         in .hl-reel, because those tokens change at the 900px breakpoint. Writing
         resolved px/vw values from here meant a viewport change left a frame
         width of stale offset behind for a frame or two, which pushed the page
         wider than the screen and latched a horizontal scrollbar. Letting CSS do
         it means a resize needs no JS at all. */
      const te = win(q, ...W.grow)
      st.setProperty('--tg', te.toFixed(4))

      const copyT = win(q, ...W.copyOut)
      st.setProperty('--copy-o', (1 - copyT).toFixed(3))
      st.setProperty('--copy-y', (-34 * copyT).toFixed(2) + 'px')
      st.setProperty('--copy-pe', copyT > 0.6 ? 'none' : 'auto')

      /* The panel is on screen only while the card it describes is fullscreen,
         so it rides the same number that drives the card's size rather than a
         window of its own: no window can disagree with te about when a card has
         arrived. `full` tracks sit at te 1 for their whole length. */
      hudFade[t.i] = smooth((te - 0.85) / 0.15).toFixed(3)

      const dotsT = win(q, ...W.dotsIn)
      st.setProperty('--dots-o', dotsT.toFixed(3))
      st.setProperty('--dots-pe', dotsT > 0.6 ? 'auto' : 'none')

      st.setProperty('--vig', (0.18 + 0.44 * te).toFixed(3))
      st.setProperty('--brk', (1 - win(q, ...W.brackets)).toFixed(3))

      /* slow ken-burns inside the frame, so the media is never static */
      const inner = (1.07 - 0.07 * smooth(q)).toFixed(4)
      t.shots.forEach(sh => sh.el.style.setProperty('--inner', inner))

      /* The photo set steps on the same gesture as the grow. A fullscreen panel
         has no gesture to hang that on, so its set moves only by hand. */
      const n = t.shots.length || 1
      const si =
        mode === 'full' ? 0 : Math.min(n - 1, Math.floor(win(q, ...W.mediaStep) * n))
      scrollIdx[t.i] = si
      if (manual[t.i] !== null && si !== manualAt[t.i]) manual[t.i] = null
      const idx = manual[t.i] !== null ? manual[t.i] : si
      if (mediaIndex[t.i] !== idx) mediaIndex[t.i] = idx

      /* the rail still fills with raw travel, so every segment reads as scrolled
         past — including a fullscreen panel, which fills as it slides through */
      const seg = root.querySelector(`[data-seg="${t.i}"]`)
      if (seg) seg.style.width = (p * 100).toFixed(2) + '%'
    })

    /* one panel, so one opacity: whichever track the reel is centred on decides
       it, and it is written as a custom property rather than made reactive so
       that a per-frame value never re-renders the component */
    root.style.setProperty('--hud-o', hudFade[activeIndex.value] ?? '0')

    /* the on-screen frame changed, so the clip that should be playing may have */
    syncVideo()
  }

  /**
   * Where this reel's scroll is allowed to come to rest, for useSmoothScroll.
   *
   * Every track contributes the position where it first fills the screen. A
   * bookend track contributes a second one at the far end of its runway, which
   * is where the card has finished growing (or finished settling) — so a reader
   * who stops in between is committed to one end of the grow instead of being
   * left on a half-grown card.
   *
   * Read fresh rather than cached: it is four rectangles, asked for once per
   * settle, against a layout that changes with the viewport and the media.
   */
  function snapPositions() {
    const out = []
    tracks.forEach(t => {
      const stageH = t.stage.offsetHeight || window.innerHeight
      const base = t.el.getBoundingClientRect().top + window.scrollY
      out.push(base)
      const travel = t.el.offsetHeight - stageH
      if (travel > 1) out.push(base + travel)
    })
    return out
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      ticking = false
      render()
    })
  }

  /** Manual media scrub. Holds until the scroll reaches a different frame. */
  function setMedia(trackIndex, shotIndex) {
    manual[trackIndex] = shotIndex
    manualAt[trackIndex] = scrollIdx[trackIndex]
    mediaIndex[trackIndex] = shotIndex
    /* a click does not run the scroll engine, so the clip swap is done here */
    syncVideo()
  }

  function applyReduced() {
    reduced.value = mq ? mq.matches : false
    /* reduced motion is handled purely in CSS — a static stacked list */
    collect()
    lastActive = -1
    if (reduced.value) {
      /* The engine has stopped writing these, so it has to take back what it last
         wrote: an inline --tg from before the setting flipped outranks the
         stylesheet's reduced-motion rules, which are class-based. */
      tracks.forEach(t => t.stage && t.stage.removeAttribute('style'))
    }
    /* render() does the active track and the panel's gate in both modes; it stops
       short of the custom properties when reduced. */
    render()
  }

  let resizeTimer = null
  let unprovideSnap = null
  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      collect()
      lastActive = -1
      render()
    }, 150)
  }

  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', applyReduced)
    applyReduced()
    unprovideSnap = provideSnapTargets(snapPositions)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    /* late image loads change the layout height, so settle once more */
    window.addEventListener('load', render)
    render()
  })

  onBeforeUnmount(() => {
    if (mq) mq.removeEventListener('change', applyReduced)
    unprovideSnap?.()
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('load', render)
    clearTimeout(resizeTimer)
  })

  return {
    reduced,
    hudOn,
    activeIndex,
    mediaIndex,
    setMedia,
    render,
    modeOf: i => trackMode(i, highlights.length),
  }
}
