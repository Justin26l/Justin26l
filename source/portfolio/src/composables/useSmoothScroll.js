import { onBeforeUnmount, onMounted } from 'vue'

/**
 * useSmoothScroll — one eased scroll position for the whole page, and a
 * one-gesture-one-stop turn wherever a component publishes rest positions.
 *
 * TWO MODES, AND WHY
 *
 *   Free scrolling, everywhere. Native wheel scrolling arrives in ~100px steps,
 *   so a scroll-driven animation advancing on it reads as a stutter rather than
 *   as movement. Outside the reel the page is eased towards where the wheel
 *   asked it to go: a little latency, motion that is continuous.
 *
 *   Turning, inside the reel. The reel publishes the positions a card may come
 *   to rest at — resting, fullscreen, and each panel. Between them it is a
 *   gallery, so a gesture turns it by exactly one of them: 0 → 1 → 2, never
 *   0 → 0.4 → 1. Letting the page drift first and catching up afterwards is what
 *   that looked like before, and it read as the page arguing with the reader.
 *
 *   A turn cannot use the free-scroll easing. That is an exponential approach,
 *   fastest in its first frame — over a whole viewport it would throw the card
 *   across the screen in three frames and stop. A turn gets its own clock
 *   instead: a fixed-duration ease-out, long enough to read as a page turning.
 *
 * THE RULES THAT MATTER
 *
 *   A turn is spent the moment it starts. The events that follow one flick — a
 *   trackpad's momentum, a mouse wheel's clicky tail — are swallowed until the
 *   turn has arrived and a beat has passed, so a single gesture can never skip a
 *   card. This is the part of MIBO_tech/useEndSnap that does apply here: the
 *   input it cancels belongs to the same gesture that started the movement.
 *
 *   Free scrolling is never held back. Outside a turn, input only ever moves the
 *   target, so a wheel mid-movement simply retargets it.
 *
 *   Only the reader's own scrolling is ever committed. Nothing here intercepts a
 *   movement the browser made by itself: an anchor's smooth scroll must land
 *   where it says it will — MIBO_tech makes the same point about clicking
 *   "Services" from the bottom of a page — so a scroll that arrives while this
 *   engine is idle is attributed to the browser and left alone. The wheel and
 *   the keyboard are driven here instead, which is what makes them unambiguously
 *   the reader's.
 *
 * Off entirely under `prefers-reduced-motion`. Touch keeps native momentum
 * scrolling — better than anything emulated here — and is committed only once
 * the fling has actually stopped.
 */

/* ---- tuning ------------------------------------------------------------- */

/** free-scroll lerp tightness. Higher follows the wheel more closely. */
const SMOOTH = 13
/** how long the page must be still before a commit may re-target it, in ms */
const SETTLE_MS = 20
/**
 * px: close enough to the target to call it arrived.
 *
 * It is 1.5 rather than a fraction of a pixel because the browser stores
 * `scrollTop` rounded — a target of 2276.4 reads back as 2276, so a sub-pixel
 * tolerance would never be met, the loop would never end, and the settle that
 * ends this whole cycle would never be reached. That is not hypothetical: it is
 * exactly what a 0.5px tolerance did, and it made the whole commit silently dead.
 */
const EPS = 1.5
/**
 * px: close enough to write the target itself rather than one more eased step.
 *
 * It has to be wider than a pixel can express, or the last step rounds back onto
 * the pixel it started from, makes no progress, and strands the page ~2px short
 * of every rest position. The visible jump this could cause is under 3px.
 */
const LAND = 1
/** px: close enough to a rest position to count as already resting on it */
const SNAP_EPS = 1
/** how long a turn takes, before its distance is folded in, in ms */
const TURN_BASE = 120
/** ms per px of travel: comfortably more than the free-scroll lerp */
const TURN_PER_PX = 0.3
/** a turn's duration is clamped into this range, in ms */
const TURN_MIN = 120
const TURN_MAX = 900
/** how long after a turn lands before another gesture may turn again, in ms */
const TURN_COOLDOWN = 20
/** how far up the tree to look for a nested vertical scroller, in elements */
const NESTED_DEPTH = 8
/** keys this engine drives itself, so that a keypress is never ambiguous */
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '])

/** decelerating, so a turn arrives rather than stops */
const easeOut = t => 1 - (1 - t) ** 3

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

/**
 * Rest positions, published by whichever component owns them.
 *
 * The reel knows where its cards may come to rest and nothing else does, so
 * rather than this module reaching into the DOM for them the reel registers a
 * reader and this module asks for a fresh list whenever it needs one.
 */
const providers = new Set()

export function provideSnapTargets(read) {
  providers.add(read)
  return () => providers.delete(read)
}

function restPositions() {
  const all = []
  providers.forEach(read => all.push(...read()))
  return all.filter(n => Number.isFinite(n)).sort((a, b) => a - b)
}

export function useSmoothScroll() {
  let raf = 0
  let target = 0
  /** the position this engine last wrote, so an outside move is recognisable */
  let written = 0
  /** -1, 0 or +1: the last direction the page actually travelled */
  let dir = 0
  let lastY = 0
  /** when the last movement reached its target, 0 while still travelling */
  let arrivedAt = 0
  /** when something other than this engine moved the page */
  let lastOutsideAt = -Infinity
  /** the wheel or a key is driving this movement, so it may be committed */
  let inputDriven = false
  /** a finger is still driving, or its fling has not finished yet */
  let touchDriven = false
  let flingTimer = 0
  let lastFrameAt = 0

  /** the running turn: where it started, where it ends, when it began */
  let turn = null
  /** a turn owns the page until it lands, and no gesture may interrupt it */
  let turning = false
  /** no gesture may turn again before this timestamp */
  let turnCooldownUntil = 0

  let reduced = null

  const scroller = () => document.scrollingElement || document.documentElement
  const maxY = () => Math.max(0, scroller().scrollHeight - window.innerHeight)

  /** write a position and take back where the page actually ended up */
  function write(top) {
    const s = scroller()
    s.scrollTo({ top, behavior: 'instant' })
    /* Read back rather than assume: the browser clamps to the end of the
       document and rounds to whole pixels, so `written` has to be where the page
       actually *is* — every later comparison against it depends on that. */
    written = s.scrollTop
    lastY = written
    return written
  }

  /**
   * A wheel over an element that scrolls on its own belongs to that element.
   * Nothing in the site does today, so this is a guard rather than a feature —
   * it is bounded to a few ancestors because it runs on every wheel event.
   */
  function nestedScroller(from) {
    let el = from
    for (let i = 0; i < NESTED_DEPTH && el && el !== document.body; i++, el = el.parentElement) {
      const overflowY = getComputedStyle(el).overflowY
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
        return el
      }
    }
    return null
  }

  /**
   * The rest position one step from `y`, or null when `y` is outside every
   * published position — which is what makes the page free-scroll again as soon
   * as the reader leaves the reel, at either end.
   */
  function adjacentRest(y, direction) {
    const ps = restPositions()
    if (ps.length < 2) return null
    if (y < ps[0] - SNAP_EPS || y > ps[ps.length - 1] + SNAP_EPS) return null
    if (direction > 0) return ps.find(p => p > y + SNAP_EPS) ?? null
    return [...ps].reverse().find(p => p < y - SNAP_EPS) ?? null
  }

  /**
   * Where a free scroll that has come to rest should be committed to.
   *
   * Direction decides, not distance: a reader who has moved *down* out of the
   * resting card is going to the fullscreen one, however small the movement.
   * Only a movement with no direction at all falls back to whichever end is
   * nearer. This is the entry path — inside the reel the turns do the work.
   */
  function decide(y) {
    const ps = restPositions()
    if (ps.length < 2) return null
    if (y < ps[0] - 1 || y > ps[ps.length - 1] + 1) return null

    let prev = null
    let next = null
    for (const p of ps) {
      if (p <= y + SNAP_EPS) prev = p
      if (p >= y - SNAP_EPS) {
        next = p
        break
      }
    }
    if (prev === null) prev = next
    if (next === null) next = prev
    if (prev === null || next === null) return null
    /* already resting on one: there is nothing to commit to */
    if (Math.abs(y - prev) <= SNAP_EPS || Math.abs(y - next) <= SNAP_EPS) return null

    if (dir > 0) return next
    if (dir < 0) return prev
    return y - prev <= next - y ? prev : next
  }

  /** the engine is done with the page until the reader touches it again */
  function settle() {
    if (turning) {
      turning = false
      turnCooldownUntil = performance.now() + TURN_COOLDOWN
    }
    raf = 0
  }

  function tick(now) {
    raf = 0
    /* `now` is the frame's own timestamp, which is *earlier* than any
       performance.now() taken while scheduling that frame. Seeding the clock
       from performance.now() made the first dt negative, which made the easing
       factor negative, which walked the page backwards — and the position then
       read back no longer matched what had been written, so the next scroll
       event looked like an outside move and killed the gesture. The first frame
       takes a nominal 60th of a second instead. */
    const dt = lastFrameAt ? Math.max(0, Math.min(64, now - lastFrameAt)) / 1000 : 1 / 60
    lastFrameAt = now

    let y = scroller().scrollTop
    if (Math.abs(y - lastY) > 0.5) dir = Math.sign(y - lastY)
    lastY = y

    /* Something moved the page that was not us: follow it, never fight it.
       `written` has to come with it — it is the record of where this engine
       believes the page is, and the arrival path returns without writing, so it
       would otherwise still name the position from before the move. A stale
       `written` cancels the very next movement as an outside one. */
    if (Math.abs(y - written) > 1.5) {
      turn = null
      target = y
      written = y
    }

    if (turn) {
      /* A turn runs on its own clock, from where it started to where it ends.
         `start` is filled in from the first frame's own timestamp, not from
         performance.now() at the moment it was asked for, so that the two
         clocks never have to agree. */
      if (!turn.start) {
        turn.start = now
        turn.from = y
      }
      const t = Math.min(1, (now - turn.start) / turn.ms)
      y = write(turn.from + (turn.to - turn.from) * easeOut(t))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
        return
      }
      turn = null
      target = y
    }

    if (Math.abs(target - y) <= EPS) {
      /* Arrived. Give the page one settle window to prove it has stopped, then
         commit — or stop for good, which is the only way this loop ever ends. */
      if (!arrivedAt) arrivedAt = now
      if (now - arrivedAt < SETTLE_MS + 40) {
        raf = requestAnimationFrame(tick)
        return
      }
      const may = inputDriven && now - lastOutsideAt > SETTLE_MS
      const to = may ? decide(y) : null
      arrivedAt = 0
      inputDriven = false
      touchDriven = false
      if (to === null) return settle()
      const landing = Math.round(clamp(to, 0, maxY()))
      if (Math.abs(landing - y) <= SNAP_EPS) return settle()
      target = landing
    } else {
      arrivedAt = 0
    }

    const k = 1 - Math.exp(-dt * SMOOTH)
    let next = y + (target - y) * k
    if (Math.abs(target - next) < LAND) next = target
    const after = write(next)
    /* If the page did not move, the remaining distance is smaller than one pixel
       can express: a step of 0.4px rounds back onto the pixel it started on, so
       the request would be made forever and never arrive. Take where it stopped
       as the target. In practice this fires only within ~3px. */
    if (after === y && Math.abs(target - after) > EPS) target = after
    raf = requestAnimationFrame(tick)
  }

  function start() {
    if (raf) return
    lastFrameAt = 0
    lastY = scroller().scrollTop
    raf = requestAnimationFrame(tick)
  }

  /**
   * Turn the page by one rest position. This is the whole of the strict
   * behaviour: the destination is chosen on the gesture, not after it.
   */
  function beginTurn(to, direction) {
    const from = scroller().scrollTop
    written = from
    target = Math.round(clamp(to, 0, maxY()))
    dir = direction || dir
    inputDriven = true
    turning = true
    turn = {
      from,
      to: target,
      start: 0,
      ms: clamp(TURN_BASE + Math.abs(target - from) * TURN_PER_PX, TURN_MIN, TURN_MAX),
    }
    start()
  }

  /** go straight to a position, as the reader's own input */
  function jumpTo(to, direction) {
    beginTurn(to, direction)
  }

  /** take the reader's free-scroll gesture as the new target */
  function retarget(step) {
    const s = scroller()
    const y = s.scrollTop
    if (Math.abs(y - written) > 1.5) target = y
    written = y
    target = clamp(target + step, 0, maxY())
    dir = Math.sign(step) || dir
    inputDriven = true
    start()
  }

  /**
   * Non-passive from the start, permanently.
   *
   * It has to be: a `wheel` listener on the root is passive by default, and an
   * event delivered to a passive-only target arrives with `cancelable: false`,
   * which makes `preventDefault` a silent no-op — registering a non-passive
   * listener on the fly does not upgrade one either. The cost is that wheel
   * handling waits on the main thread, which is the price of owning the scroll.
   * The handler returns on its first line whenever the wheel is not ours.
   */
  function onWheel(e) {
    if (reduced?.matches) return
    if (e.ctrlKey || e.metaKey) return /* pinch-zoom and browser gestures */
    if (e.defaultPrevented) return
    if (nestedScroller(e.target)) return

    e.preventDefault()

    /* deltaMode 0 is pixels, 1 is lines, 2 is pages */
    const step =
      e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY
    const now = performance.now()

    /* This gesture is already spent: a turn is in flight, or one has just
       landed. Everything arriving here is the tail of the gesture that started
       it, and acting on it is what would skip a card. */
    if (turning || now < turnCooldownUntil) return

    const y = scroller().scrollTop
    const heading = Math.sign(step) || dir
    const to = adjacentRest(y, heading)
    if (to !== null && Math.abs(to - y) > SNAP_EPS) return beginTurn(to, heading)

    retarget(step)
  }

  /**
   * The keyboard is driven here rather than left to the browser, for the same
   * reason the wheel is: a key scroll that the browser performs arrives as an
   * outside move and so could never be committed, and a key press is not
   * ambiguous the way that is.
   */
  function onKeydown(e) {
    if (reduced?.matches || e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
    const el = e.target
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
    if (!SCROLL_KEYS.has(e.key)) return
    e.preventDefault()

    const y = scroller().scrollTop
    if (e.key === 'Home') return jumpTo(0, -1)
    if (e.key === 'End') return jumpTo(maxY(), 1)
    if (e.key === 'ArrowDown') return retarget(90)
    if (e.key === 'ArrowUp') return retarget(-90)

    /* A page key moves to the next rest position rather than by a fixed page.
       The reel's rest positions sit closer together than a page does, so a blind
       page step from the resting card would sail past the fullscreen one and
       land the reader on the next project having never seen this one grow. */
    const down = e.key === 'PageDown' || e.key === ' '
    const to = adjacentRest(y, down ? 1 : -1)
    if (to === null) return retarget((down ? 1 : -1) * window.innerHeight * 0.9)
    jumpTo(to, down ? 1 : -1)
  }

  /* Touch is never intercepted: native momentum is better than anything
     emulated here. Recording it is what allows the position a fling lands on to
     be committed — and the commit has to wait for the fling to finish, or our
     writing would fight the finger. */
  function onTouchMove() {
    if (reduced?.matches) return
    touchDriven = true
    inputDriven = true
    clearTimeout(flingTimer)
  }

  /**
   * A scroll event that arrives while this engine is idle was the browser's own
   * doing — an anchor's smooth scroll, a scrollbar drag, a fling. Only the last
   * of those is the reader's, and it is the one the finger told us about.
   *
   * "Ours" is decided by position, not by whether a frame is in flight: `tick`
   * clears its frame handle at the top of every frame, so a scroll event fired
   * by our own write can land in that gap and look like an outside move — which
   * silently reset the target to wherever the page had got to, and stopped the
   * movement dead.
   */
  function onScroll() {
    if (reduced?.matches) return
    if (touchDriven) {
      clearTimeout(flingTimer)
      flingTimer = setTimeout(() => {
        touchDriven = false
        target = scroller().scrollTop
        start()
      }, SETTLE_MS + 40)
      return
    }
    const y = scroller().scrollTop
    if (Math.abs(y - written) <= 1.5) return
    inputDriven = false
    lastOutsideAt = performance.now()
    target = y
    written = y
    start()
  }

  function onMotionChange() {
    if (!reduced?.matches) return
    if (raf) cancelAnimationFrame(raf)
    clearTimeout(flingTimer)
    raf = 0
    arrivedAt = 0
    turn = null
    turning = false
    inputDriven = false
    touchDriven = false
  }

  onMounted(() => {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.addEventListener('change', onMotionChange)
    written = scroller().scrollTop
    lastY = written
    target = written
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    clearTimeout(flingTimer)
    reduced?.removeEventListener('change', onMotionChange)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('scroll', onScroll)
  })
}
