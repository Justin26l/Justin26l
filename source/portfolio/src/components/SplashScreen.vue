<template>
  <div v-if="visible" class="splash" aria-hidden="true">
    <span
      v-for="(bar, i) in bars"
      :key="i"
      class="splash-bar"
      :class="{ 'is-lit': bar.lit, 'is-out': bar.out }"
    />
  </div>
</template>

<script setup>
/**
 * Splash screen.
 *
 * A full-viewport curtain of vertical bars that wipes open from the middle
 * outward: each bar flares to the brand lime, then dissolves, revealing the
 * site underneath. Ported from the original jQuery intent in
 * `src/assets/js/intro.js` (centre-out order, dark-mode lime), which never
 * actually rendered because the bar elements were styled with a class name
 * (`.intro-bars`) that no element carried.
 *
 * Behaviour that makes it a splash screen rather than a decoration:
 *  - it covers the viewport and blocks interaction while it is up
 *  - page scroll is locked so the site cannot move behind it
 *  - it removes itself from the DOM when done, so it can never intercept a
 *    click or trap focus afterwards
 *  - it is skipped entirely under `prefers-reduced-motion`, rather than being
 *    shown as a static white flash
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const BAR_COUNT = 26
const HOLD = 100 // let the closed curtain register before it starts opening
const STAGGER = 30 // gap between neighbouring bars
const FLASH = 70 // how long a bar holds the lime before it dissolves
const FADE = 420 // must match .splash-bar transition duration
const TOTAL = HOLD + (BAR_COUNT - 1) * STAGGER + FLASH + FADE + 60

/** middle-out order: mid, mid+1, mid-1, mid+2, mid-2 … */
function centreOut(n) {
  const mid = Math.floor(n / 2)
  const order = [mid]
  for (let d = 1; order.length < n; d++) {
    if (mid + d < n) order.push(mid + d)
    if (order.length < n && mid - d >= 0) order.push(mid - d)
  }
  return order
}

const prefersReduced =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const visible = ref(!prefersReduced)
const bars = ref(Array.from({ length: BAR_COUNT }, () => ({ lit: false, out: false })))

let timers = []
let locked = false
let prevHtmlOverflow = ''
let prevBodyOverflow = ''

function lock() {
  if (locked) return
  prevHtmlOverflow = document.documentElement.style.overflow
  prevBodyOverflow = document.body.style.overflow
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  locked = true
}

function unlock() {
  if (!locked) return
  document.documentElement.style.overflow = prevHtmlOverflow
  document.body.style.overflow = prevBodyOverflow
  locked = false
  /* locking hid the scrollbar, so the viewport is a scrollbar-width wider now
     that it is back. Tell the highlight reel to re-measure instead of waiting
     for the next scroll event. */
  window.dispatchEvent(new Event('resize'))
}

function finish() {
  visible.value = false
  unlock()
}

onMounted(() => {
  if (!visible.value) return
  lock()
  const order = centreOut(BAR_COUNT)
  order.forEach((barIndex, k) => {
    const at = HOLD + k * STAGGER
    timers.push(
      setTimeout(() => {
        bars.value[barIndex].lit = true
      }, at),
    )
    timers.push(
      setTimeout(() => {
        bars.value[barIndex].out = true
      }, at + FLASH),
    )
  })
  timers.push(setTimeout(finish, TOTAL))
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  timers = []
  unlock()
})
</script>

<style scoped>
@reference "../assets/css/style.css";

.splash {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  overflow: hidden;
  /* the bars are the curtain, so the container itself must stay transparent —
     otherwise dissolving them would reveal the container, not the site */
  background: transparent;
}

.splash-bar {
  /* without this the bars have zero width and the whole splash is invisible */
  flex: 1 1 0;
  height: 100%;
  /* the light surface tone, matching every other light band */
  @apply bg-gray-100;
  transition:
    background-color 0.16s ease-out,
    opacity 0.42s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: opacity, background-color;
}

.splash-bar.is-lit {
  @apply bg-primary-500;
}

.splash-bar.is-out {
  opacity: 0;
}

/* belt and braces: never show a full-screen flash to someone who asked for
   reduced motion, even if the script check is bypassed */
@media (prefers-reduced-motion: reduce) {
  .splash {
    display: none;
  }
}
</style>
