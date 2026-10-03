import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

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
 * Progress windows. These are constrained by geometry rather than taste:
 * the card is parked to the right at rest and its left edge crosses the
 * caption's right edge at p≈0.37, so copyOut must finish before then or the
 * two collide. Measured with an overlap sweep across p 0 → 0.62.
 */
const W = {
  grow: [0.2, 0.7],
  copyOut: [0.13, 0.37],
  hudIn: [0.52, 0.78],
  dotsIn: [0.46, 0.68],
  mediaStep: [0.14, 0.9],
  brackets: [0.2, 0.46],
}

export function useHighlightReel(rootRef, highlights) {
  const reduced = ref(false)
  const railOn = ref(false)
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
    if (reduced.value || !tracks.length) return
    const root = rootRef.value
    if (!root) return
    const vh = window.innerHeight

    tracks.forEach(t => {
      const rect = t.el.getBoundingClientRect()
      const stageH = t.stage.offsetHeight || vh
      const p = clamp(-rect.top / Math.max(1, rect.height - stageH), 0, 1)
      const st = t.stage.style

      /* ONE unitless number drives all of the card's responsive geometry.
         Scale, offset and radius are computed in CSS from --tg plus the tokens
         in .hl-reel, because those tokens change at the 900px breakpoint. Writing
         resolved px/vw values from here meant a viewport change left a frame
         width of stale offset behind for a frame or two, which pushed the page
         wider than the screen and latched a horizontal scrollbar. Letting CSS do
         it means a resize needs no JS at all. */
      const te = win(p, ...W.grow)
      st.setProperty('--tg', te.toFixed(4))

      const copyT = win(p, ...W.copyOut)
      st.setProperty('--copy-o', (1 - copyT).toFixed(3))
      st.setProperty('--copy-y', (-34 * copyT).toFixed(2) + 'px')
      st.setProperty('--copy-pe', copyT > 0.6 ? 'none' : 'auto')

      const hudT = win(p, ...W.hudIn)
      st.setProperty('--hud-o', hudT.toFixed(3))
      st.setProperty('--hud-y', (22 * (1 - hudT)).toFixed(2) + 'px')
      st.setProperty('--hud-pe', hudT > 0.6 ? 'auto' : 'none')

      const dotsT = win(p, ...W.dotsIn)
      st.setProperty('--dots-o', dotsT.toFixed(3))
      st.setProperty('--dots-pe', dotsT > 0.6 ? 'auto' : 'none')

      st.setProperty('--vig', (0.18 + 0.44 * te).toFixed(3))
      st.setProperty('--brk', (1 - win(p, ...W.brackets)).toFixed(3))

      /* slow ken-burns inside the frame, so the media is never static */
      const inner = (1.07 - 0.07 * smooth(p)).toFixed(4)
      t.shots.forEach(sh => sh.el.style.setProperty('--inner', inner))

      /* the photo set steps on the same gesture as the grow */
      const n = t.shots.length || 1
      const si = Math.min(n - 1, Math.floor(win(p, ...W.mediaStep) * n))
      scrollIdx[t.i] = si
      if (manual[t.i] !== null && si !== manualAt[t.i]) manual[t.i] = null
      const idx = manual[t.i] !== null ? manual[t.i] : si
      if (mediaIndex[t.i] !== idx) mediaIndex[t.i] = idx

      const seg = root.querySelector(`[data-seg="${t.i}"]`)
      if (seg) seg.style.width = (p * 100).toFixed(2) + '%'
    })

    let active = 0
    tracks.forEach((t, i) => {
      const rect = t.el.getBoundingClientRect()
      if (rect.top <= vh * 0.5 && rect.bottom > vh * 0.5) active = i
    })
    if (active !== lastActive) {
      lastActive = active
      activeIndex.value = active
    }

    const band = root.querySelector('.hl-reel')
    if (band) {
      const r = band.getBoundingClientRect()
      railOn.value = r.top < vh * 0.6 && r.bottom > vh * 0.4
    }

    /* the on-screen frame changed, so the clip that should be playing may have */
    syncVideo()
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
    if (!reduced.value) {
      lastActive = -1
      render()
    } else {
      /* the clip stays paused on its first frame, playable via native controls */
      syncVideo()
    }
  }

  let resizeTimer = null
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
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    /* late image loads change the layout height, so settle once more */
    window.addEventListener('load', render)
    render()
  })

  onBeforeUnmount(() => {
    if (mq) mq.removeEventListener('change', applyReduced)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('load', render)
    clearTimeout(resizeTimer)
  })

  return { reduced, railOn, activeIndex, mediaIndex, setMedia, render }
}
