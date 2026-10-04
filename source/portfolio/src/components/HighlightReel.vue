<template>
  <div ref="rootRef" class="hl-reel" :class="{ 'is-reduced': reduced }">
    <!-- -------- one sticky, pinned stage per highlight --------
         The two ends carry a scroll runway (grow / settle); everything between
         is a fullscreen panel with no travel, which is also where the page's
         snap points land. -->
    <article
      v-for="(p, i) in highlights"
      :key="p.key"
      class="hl-track"
      :class="`is-${modeOf(i)}`"
    >
      <div class="hl-stage">
        <div class="hl-plusgrid" aria-hidden="true"></div>

        <div class="hl-frame">
          <div class="hl-media">
            <div
              v-for="(m, mi) in p.media"
              :key="m.src"
              class="hl-shot"
              :class="{ 'is-on': mediaIndex[i] === mi }"
            >
              <!-- blurred cover copy fills the letterbox, sharp contain frame on top:
                   the real assets range from 1702x957 to 852x1704, and cropping a
                   phone screenshot to fill would destroy it.
                   Loaded eagerly: only three reel images exist, and a scroll-driven
                   hero must never pop in halfway through the grow. -->
              <template v-if="m.type === 'video'">
                <!-- The clip is 16:9 and the frame is the viewport, so a narrow
                     screen leaves it letterboxed. The wash behind is a still
                     lifted from the clip itself — no second video decode, and
                     nothing fabricated. Playback is driven by useHighlightReel,
                     which plays it only while the card is on screen and leaves it
                     paused (with controls) under prefers-reduced-motion. -->
                <span
                  class="bg bg--still"
                  :style="{ backgroundImage: `url(${m.poster})` }"
                  aria-hidden="true"
                ></span>
                <video
                  class="fg"
                  :src="m.src"
                  :aria-label="m.alt"
                  muted
                  loop
                  playsinline
                  preload="auto"
                  :controls="reduced"
                ></video>
              </template>

              <template v-else>
                <img class="bg" :src="m.src" alt="" aria-hidden="true" decoding="async" />
                <img class="fg" :src="m.src" :alt="m.alt" decoding="async" />
              </template>
            </div>

            <!-- No real screenshot exists for this project. A typographic cover is an
                 intentional design, not a broken asset — and it fabricates nothing. -->
            <div v-if="!p.media.length" class="hl-shot is-on hl-cover">
              <span class="hl-cover-name font-audiowide">{{ p.title }}</span>
              <span class="hl-cover-type">{{ p.type }}</span>
            </div>
          </div>

          <div class="hl-vignette" aria-hidden="true"></div>
          <div class="hl-corners" aria-hidden="true"><span /><span /><span /><span /></div>
        </div>

        <!-- media-set index: a sibling of the frame, so the grow transform never
             scales it down and never clips it. Own scrim, because a light media
             frame makes white dot outlines vanish. -->
        <div v-if="p.media.length > 1" class="hl-dots">
          <span class="hl-count">
            <b>{{ mediaIndex[i] + 1 }}</b> / {{ String(p.media.length).padStart(2, '0') }}
          </span>
          <button
            v-for="(m, mi) in p.media"
            :key="m.src"
            type="button"
            class="hl-dot"
            :class="{ 'is-on': mediaIndex[i] === mi }"
            :aria-label="`Show item ${mi + 1} of ${p.media.length} for ${p.title}`"
            @click="setMedia(i, mi)"
          />
        </div>

        <!-- Resting-state editorial caption: lives in the stage, not the frame, so
             it can sit in the gutter beside the shrunken card.
             It is the other half of the HUD's bargain — the panel below only
             appears once a card is fullscreen, so without this both bookend rest
             states would have no words on them at all. The two never show
             together: the caption is gone by the time the card is a third grown,
             and the panel does not begin until it is nearly all the way. -->
        <div v-if="modeOf(i) !== 'full'" class="hl-copy">
          <p class="hl-info">{{ p.year }} · {{ p.type }}<template v-if="p.org!=='Personal'"> · {{ p.org }}</template></p>
          <h2 class="hl-title font-audiowide">{{ p.title }}</h2>
          <p class="hl-role">{{ p.role }}</p>
          <p class="hl-desc">{{ p.description }}</p>
          <p v-if="p.links.length" class="links links--dark">
            <a
              v-for="l in p.links.slice(0, 2)"
              :key="l.href"
              :href="l.href"
              target="_blank"
              rel="noopener"
              >{{ l.label }}</a
            >
          </p>
        </div>
      </div>
    </article>

    <!-- One HUD for the whole reel, fixed to the viewport rather than carried
         inside a card.
         Each card used to render its own copy, which put two panels of text on
         screen through every hand-off, both of them sliding with the media they
         belonged to. As one fixed panel it never moves: only the copy inside it
         changes, keyed on the index.
         Its bottom row is the reel's index — one bar per project and no words,
         because the panel above it already names the project it is showing, so a
         badge, a name and a count were three ways of saying the same thing. -->
    <div class="hl-hud-outer" :class="{ 'is-on': hudOn }">
      <div class="hl-hud">
        <Transition name="hl-swap" mode="out-in">
          <div :key="active.key" class="left">
            <p class="hl-info">
              {{ active.year }} · {{ active.type
              }}<template v-if="active.org !== 'Personal'"> · {{ active.org }}</template>
            </p>
            <h2 class="hl-title font-audiowide">{{ active.title }}</h2>
            <p class="hl-role">{{ active.role }}</p>
            <p class="hl-desc">{{ active.description }}</p>
            <p v-if="active.links.length" class="links links--dark">
              <a
                v-for="l in active.links"
                :key="l.href"
                :href="l.href"
                target="_blank"
                rel="noopener"
                >{{ l.label }}</a
              >
            </p>
          </div>
        </Transition>

        <div class="hl-segs">
          <span v-for="(p, i) in highlights" :key="p.key" class="hl-seg"><i :data-seg="i" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useHighlightReel } from '../composables/useHighlightReel.js'

const props = defineProps({
  highlights: { type: Array, required: true },
})

const rootRef = ref(null)
const { reduced, hudOn, activeIndex, mediaIndex, setMedia, modeOf } = useHighlightReel(
  rootRef,
  props.highlights,
)

const active = computed(() => props.highlights[activeIndex.value] || props.highlights[0])
</script>

<style scoped>
@reference "../assets/css/style.css";

/* ============================================================================
   HIGHLIGHT REEL
   A fullscreen gallery with bookends. The first and last highlights each get a
   tall scroll runway with a position:sticky stage pinned to the viewport; scroll
   progress p (0 → 1) across that runway drives the scale-up (or, at the tail end,
   the settle back down), the caption hand-off, the HUD and the photo set, all
   from CSS custom properties written by useHighlightReel.

   Every highlight between the bookends is a plain fullscreen panel with no
   runway at all (--runway is one viewport), so scrolling only slides it into
   place. Those are the positions the page snaps on.

   Resting geometry lives here (not in JS): it changes per breakpoint, and it is
   all derived in CSS so a resize needs no JS at all.
   ========================================================================== */

/* Snapping is done in JS, by useSmoothScroll, for two reasons CSS snap cannot
   cover. It has to be able to reach a position that is not an element edge —
   the point at which a bookend card has finished growing is mid-track, with
   nothing there to declare a snap area. And it has to commit by *direction*
   rather than by distance: a reader who has moved down out of the resting card
   is going to the fullscreen one, even from 20px away, or they are left parked
   on a half-grown card. The rest positions the reel publishes live in
   useHighlightReel.snapPositions(). */

.hl-reel {
  --s-rest: 0.46; /* resting card scale */
  --s-peak: 1; /* fullscreen card scale */
  --ty-rest: 0svh; /* resting vertical offset */
  --x-rest: 16vw; /* parks the small card right so the left gutter is free
                     for the caption instead of the two colliding */
  --runway: 200vh; /* scroll runway for the two bookend tracks. This is how far a
                      card travels while it grows, and a turn plays that whole
                      distance as one movement, so it sets how much ground the
                      animation covers — not how much scrolling it costs. */
  --gutter: 5vw;
  /* HUD scrim alpha, as a fraction of the alpha it was tuned to. Kept as one
     knob because it is a legibility trade, not a free win — the measured table
     on .hl-hud is what to re-read before changing it. */
  --scrim: 0.6;
  /* the HUD panel's distance from the left and bottom edges of the viewport,
     and the widest it is allowed to grow. svw rather than vw so the panel is
     not re-measured when a desktop scrollbar comes and goes. */
  --hud-inset: 5svw;
  --hud-max: 50svw;
  position: relative;
  /* The band's dark ground lives HERE, not on each stage. Stages are siblings
     painted in DOM order, so an opaque stage background painted over the
     previous stage's card shadow and cut it off at the boundary — the seam this
     was meant to remove. Transparent stages let the shadow fall across the
     boundary and fade, which is what makes the hand-off read as continuous. */
  @apply bg-neutral-800;
}

.hl-track {
  position: relative;
  height: var(--runway);
}

/* Snap rest positions belong to the fullscreen panels, and only to them. A
   panel is one screen: stopping half way between two of them shows the bottom
   of one card and the top of the next, which is a state with no meaning. A
   bookend runway is the opposite — every position along it is a deliberate
   frame of the grow. That split is the useful part of the pattern in
   MIBO_tech: snap where coming to rest half-shown is wrong, and nowhere else.
   A bookend still publishes its two ends, which is what keeps a reader off a
   half-grown card. */
.hl-track.is-full {
  --runway: 100svh;
}

.hl-stage {
  position: sticky;
  top: 0;
  height: 100svh;
  /* No background and no clipping, both deliberate.
     Clipping cut the card's box-shadow off at the stage boundary; an opaque
     background then painted over it from the NEXT stage, since stages are
     siblings in DOM order. Either one leaves a hard seam mid hand-off, so the
     dark ground lives on .hl-reel and the stages stay transparent here. */
  overflow: visible;
  display: grid;
  place-items: center;
  /* grow progress, 0 = resting card, 1 = fullscreen. Written by
     useHighlightReel; defaults to 0 so the resting card is correct before JS
     runs. Everything derived from it is computed in CSS below, where the
     breakpoint tokens live. */
  --tg: 0;
  /* deliberately no opacity animation: a fullscreen card stays fully opaque and
     the sticky release carries it up out of view */
}

/* the plus texture from the site's contact band, reused as surround texture */
.hl-plusgrid {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  pointer-events: none;
  background-repeat: repeat;
  background-size: 48px 48px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M23 18h2v12h-2zM18 23h12v2H18z' fill='%23ffffff' fill-opacity='.07'/%3E%3C/svg%3E");
}

/* ================================================================= the card */
/* Sized to the stage then scaled down, so the grow is a pure GPU transform with
   zero layout thrash.

   Scale, resting offset and radius are all derived here from --tg (grow
   progress) and the breakpoint tokens on .hl-reel. Deriving them in JS instead
   meant a viewport change briefly kept the old breakpoint's resolved offsets,
   which pushed the page wider than the screen and latched a horizontal
   scrollbar. In CSS, a resize recomputes everything with no JS involved. */
.hl-frame {
  position: relative;
  /* 100% of the stage, never 100vw: vw includes the scrollbar width, which would
     make the frame wider than its container — and the stage no longer clips. */
  width: 100%;
  height: 100svh;
  overflow: hidden;
  --scale: calc(var(--s-rest) + (var(--s-peak) - var(--s-rest)) * var(--tg));
  /* the card's own ground, behind letterboxed media. Dark means neutral-800. */
  @apply bg-neutral-800;
  transform: translate3d(
      calc(var(--x-rest) * (1 - var(--tg))),
      calc(var(--ty-rest) * (1 - var(--tg))),
      0
    )
    scale(var(--scale));
  /* divided by the scale so the *visual* radius stays correct as it goes to 0 */
  border-radius: calc(12px * (1 - var(--tg)) / var(--scale));
  box-shadow: 0 40px 120px -40px rgba(0, 0, 0, 0.9);
  will-change: transform, border-radius;
}

.hl-shot {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.hl-shot.is-on {
  opacity: 1;
}
.hl-shot .bg,
.hl-shot .fg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.hl-shot .bg {
  object-fit: cover;
  filter: blur(46px) saturate(1.15);
  opacity: 0.34;
  transform: scale(1.14);
}
/* the wash behind a clip is a span with a background, not an <img> */
.hl-shot .bg--still {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.hl-shot .fg {
  object-fit: contain;
  transform: scale(var(--inner, 1.06));
  transition: transform 0.1s linear;
}
/* A clip already moves. Ken-burning it on top of real motion only softens the
   frame, so the video is the one media kind with no synthetic push. */
.hl-shot video.fg {
  transform: none;
  display: block;
}

/* typographic cover for projects with no screenshot yet */
.hl-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
  text-align: center;
  padding: 0 7%;
  /* neutral-800 ground with the texture on top — the only dark tone allowed */
  @apply bg-neutral-800;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(162, 242, 3, 0.03) 0 16px,
    transparent 16px 32px
  );
}
.hl-cover-name {
  @apply text-primary-500;
  font-size: clamp(1.9rem, 6.2vw, 5.4rem);
  line-height: 1.05;
  text-wrap: balance;
}
.hl-cover-type {
  @apply text-neutral-400;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hl-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 95% at 50% 45%, transparent 42%, rgba(0, 0, 0, 0.72) 100%);
  opacity: var(--vig, 0.18);
}

/* corner brackets, reusing the site's corner motif */
.hl-corners {
  position: absolute;
  inset: 2.2%;
  pointer-events: none;
  opacity: var(--brk, 1);
}
.hl-corners span {
  position: absolute;
  width: 26px;
  height: 26px;
  @apply border-2 border-primary-500;
}
.hl-corners span:nth-child(1) {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
}
.hl-corners span:nth-child(2) {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
}
.hl-corners span:nth-child(3) {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
}
.hl-corners span:nth-child(4) {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
}

/* ============================================================ resting caption */
.hl-copy {
  position: absolute;
  left: var(--gutter);
  top: 0;
  bottom: 0;
  width: min(27vw, 30rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
  transform: translateY(var(--copy-y, 0px));
  opacity: var(--copy-o, 1);
  pointer-events: var(--copy-pe, auto);
}

/* ==================================================================== HUD --
   On a desktop the HUD is a panel, not a bar.

   It was a full-width gradient rising off the bottom edge, which is the only
   shape that works when the copy has to sit directly on the media. As a
   container it can be sized to its own content and carry its own surface
   instead: dark, translucent and blurred, so the media reads through it as a
   wash of its own colour rather than as a picture interrupted by a black band.
   The blur is what keeps it legible without a heavy tint — it averages the
   backdrop under the text rather than letting whatever is behind one glyph
   decide the contrast for it.

   Phones keep the same three layers, unstaked to the full width, with the
   padding of each layer cut back — see the 900px block below. A content-sized
   panel cannot work there: `fit-content` resolves against --hud-max, which on a
   390px screen is a 195px column.

   MEASURED over the reel's lightest media (Digital Clone's white page), sampled
   per text row across the whole panel on a backdrop-only render, worst case:

     row            size        backdrop        contrast
     title          34.6px      rgb(76,76,76)     6.2:1
     role           11.5px      rgb(76,76,76)     8.0:1
     description    14.7px      rgb(76,76,76)     7.5:1
     link           13.8px      rgb(69,69,69)     7.0:1

   All four clear AA. The backdrop comes out as exactly 0.7 black over the
   blurred page (0.3 x 255 = 76), and that is what makes a tint this light
   viable where the old full-width gradient needed 0.94 to hold: the panel only
   has to cover its own text, and the blur averages what is behind it rather
   than letting one glyph's background decide the contrast for the whole row.

   DELIBERATE EXCEPTION to the single-dark rule: this panel, the vignette and the
   media-index chip all sit on top of arbitrary media rather than on the page, so
   they stay near-black rather than neutral-800. */
.hl-hud-outer {
  /* fixed, not absolute inside a card: the panel must not scale with the grow or
     slide away with a panel, so it lives outside the frames entirely and the
     only thing that changes as the reel turns is the copy inside it */
  position: fixed;
  left: var(--hud-inset);
  right: auto;
  bottom: 0;
  z-index: 30;
  width: fit-content;
  max-width: var(--hud-max);
  padding: 12px 12px 0rem;
  background: rgb(0 0 0 / calc(.25 * var(--scrim)));
  backdrop-filter: blur(6px);
  border-radius: 32px 32px 0 0;
  /* Two gates, and both are needed. This one is the reel being on screen at all
     — the panel is fixed, so without it, it would follow the reader into every
     other section. The opacity inside it is whether the card being described is
     fullscreen, which the composable writes as --hud-o; that is what keeps it
     off the bookend rest states, where the caption in the gutter is talking. */
  opacity: 0;
  pointer-events: none;
}
.hl-hud-outer.is-on {
  opacity: var(--hud-o, 0);
  pointer-events: auto;
}
.hl-hud {
  padding: 12px 12px 0rem;
  background: rgb(0 0 0 / calc(.25 * var(--scrim)));
  border-radius: 24px 24px 0 0;
}
.hl-hud .left {
  max-width: 62ch;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.4rem;
  background: rgb(0 0 0 / calc(.44 * var(--scrim)));
  border-radius: 16px;
}
.hl-hud .hl-title {
  font-size: clamp(1.4rem, 2.4vw, 2.4rem);
}
.hl-hud .hl-desc {
  font-size: 0.92rem;
}

/* the reel's index: one bar per project, along the panel's bottom, inset to
   line up under the copy above it and to keep the same floor as the copy's own
   padding */
.hl-segs {
  display: flex;
  gap: 6px;
  padding: 10px 1.4rem 1.4rem;
}

/* the copy swaps with a short cross-fade rather than a blink: the index changes
   mid-turn, while the media either side of it is still sliding.
   The reduced-motion override has to be neutralised here rather than by binding
   `:css="false"` on the Transition: with CSS off and no JS hooks, Vue never calls
   the leave's `done`, and `mode="out-in"` then waits on it forever — the panel
   keeps the old copy's space and never renders the new one. A zero transition
   still fires the end callback, which is what makes this the safe way to do it. */
.hl-swap-enter-active,
.hl-swap-leave-active {
  transition: opacity 0.16s linear;
}
.hl-swap-enter-from,
.hl-swap-leave-to {
  opacity: 0;
}
.hl-reel.is-reduced .hl-swap-enter-active,
.hl-reel.is-reduced .hl-swap-leave-active {
  transition: none;
}

/* ========================================================== shared fragments
   .pills / .links / .prov live in the global assets/css/projects.css because the
   reel and the grid both render them. */
.hl-title {
  @apply text-primary-500;
  font-size: clamp(2rem, 3.4vw, 3.4rem);
  line-height: 1.02;
  margin: 0;
  text-wrap: pretty;
}
.hl-info {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.6;
  margin: 0;
  @apply text-primary-300;
}
.hl-role {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.6;
  margin: 0;
  @apply text-white;
}
.hl-desc {
  font-size: clamp(0.86rem, 1.02vw, 1rem);
  line-height: 1.65;
  margin: 0;
  text-wrap: pretty;
  @apply text-white;
}

/* ================================================================ media dots */
.hl-dots {
  position: absolute;
  top: 2.6rem;
  right: var(--gutter);
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(10, 10, 10, 0.58);
  border-radius: 999px;
  padding: 0.4rem 0.75rem;
  backdrop-filter: blur(6px);
  opacity: var(--dots-o, 0);
  pointer-events: var(--dots-pe, none);
  transition: opacity 0.2s linear;
}
.hl-count {
  font-family: 'audiowide', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  @apply text-neutral-300;
}
.hl-count b {
  font-weight: 400;
  @apply text-primary-500;
}
.hl-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  transition: 0.2s;
}
.hl-dot:hover {
  @apply border-primary-500;
}
.hl-dot.is-on {
  @apply bg-primary-500 border-primary-500;
  transform: scale(1.25);
}

/* ============================================================= reel index --
   Was a fixed pill at the bottom of the screen carrying a provenance badge, the
   project name, a count and these bars — four ways of saying where the reader
   was, on top of a HUD that said all of it again. The bars are the only part
   that said something the panel could not, so they moved into the panel's
   bottom and the rest went. */
.hl-seg {
  width: 54px;
  height: 4px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
}
.hl-seg i {
  display: block;
  height: 100%;
  width: 0;
  @apply bg-primary-500;
}

/* ============================================================== RESPONSIVE --
   Below 900px the panel takes the whole width, and the caption moves under the
   card. */
@media (max-width: 900px) {
  .hl-reel {
    --s-rest: 0.9;
    --ty-rest: 0svh;
    --x-rest: 0vw;
    --gutter: 6vw;
  }
  /* Not grown: the media reads at 90svw, and fullscreen is still the whole
     viewport (--s-peak). The media is `contain`, so on a portrait frame it is the
     width that decides how large it appears — 0.9 of the viewport width is a card
     with a margin around it, where 0.62 scaled *everything* down to a thumbnail.
     No aspect is imposed on the card, so whatever the asset is — a 16:9 clip, a
     phone screenshot — it is contained where it lands rather than having a ratio
     argued with it. */
  .hl-copy {
    left: 0;
    right: 0;
    top: auto;
    bottom: 3.7rem;
    width: auto;
    padding: 0 var(--gutter);
    justify-content: flex-end;
    gap: 0.45rem;
  }
  .hl-copy .hl-title {
    font-size: clamp(1.4rem, 6vw, 1.9rem);
  }
  /* Long copy defers to the fullscreen panel instead of being crammed in beside
     the card. */
  .hl-copy .hl-desc,
  .hl-copy .hl-role {
    display: none;
  }
  /* The resting caption keeps one link only: MCPLUS has two, which wrap and push
     the caption up over the card. */
  .hl-copy .links a:not(:first-child) {
    display: none;
  }
  .hl-plusgrid {
    display: none;
  }
  /* On a phone the sheet takes the whole width.
     A content-sized panel has nothing to size against here: `fit-content` is
     capped by --hud-max, which on a 390px screen is a 195px column — the
     description wrapped over thirteen lines in it, and on a short phone the
     column grew tall enough to push its own top edge off the top of the screen.
     The three layers stay, because they are the look, but each one gives back
     padding so the copy keeps a usable line length. */
  .hl-hud-outer {
    left: 0;
    right: 0;
    width: auto;
    max-width: none;
    padding: 10px 10px 0.5rem;
    border-radius: 24px 24px 0 0;
  }
  .hl-hud {
    padding: 8px 8px 0;
    border-radius: 18px 18px 0 0;
  }
  .hl-hud .left {
    padding: 1.1rem;
    border-radius: 14px 14px 0 0;
  }
  .hl-hud .hl-role {
    font-size: 0.62rem;
  }
  .hl-segs {
    padding: 9px 1.1rem 10px;
  }
  .hl-corners {
    inset: 1.6%;
  }
  /* top-right, so the reel's index in the panel below is the only thing at the
     bottom of the screen */
  .hl-dots {
    top: 1.4rem;
    bottom: auto;
    right: var(--gutter);
  }
  /* four bars have to share a phone's width, and the count that used to sit
     beside them is gone */
  .hl-seg {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
  }
  .hl-cover-name {
    font-size: clamp(1.6rem, 9vw, 2.6rem);
  }
}

/* ======================================================== REDUCED MOTION --
   Honour the OS setting: no scroll runway, no snap, no scale-up. Every track
   becomes the same plain fullscreen panel the middle of the reel already uses,
   so nothing on the page moves except the scroll itself.
   No snap rule is needed here: useSmoothScroll is off in this mode, and with no
   runway left every track publishes a single rest position anyway. */
.hl-reel.is-reduced .hl-track {
  --runway: 100svh;
}
/* pin every stage at the end state of a grow, since no JS runs in this mode */
.hl-reel.is-reduced .hl-stage {
  --tg: 1;
}
/* The caption is hidden rather than stacked below: it carries the same project
   text as the panel, so showing both reads as a duplicated title. */
.hl-reel.is-reduced .hl-copy {
  display: none;
}
/* hudOn is written by the composable's scroll loop, which does not run in this
   mode — so without this the gate would stay at its 0 default and the panel
   would never appear. */
.hl-reel.is-reduced .hl-hud-outer {
  opacity: 1 !important;
  pointer-events: auto !important;
}
.hl-reel.is-reduced .hl-dots {
  opacity: 1 !important;
  pointer-events: auto !important;
}
.hl-reel.is-reduced .hl-shot .fg {
  transform: none !important;
}
</style>
