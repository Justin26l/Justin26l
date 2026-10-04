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

          <!-- the HUD rises once the card has grown; its scrim has to guarantee
               contrast over ANY media, including light-mode screenshots.
               Same text layout as a grid card: pills, title, role, description. -->
            <div class="hl-hud">
              <div class="left">
                <p class="hl-info">{{ p.year }} · {{ p.type }}<template v-if="p.org!=='Personal'"> · {{ p.org }}</template></p>
                <h3 class="hl-title font-audiowide">{{ p.title }}</h3>
                <p class="hl-role">{{ p.role }}</p>
                <p class="hl-desc">{{ p.description }}</p>
                <p v-if="p.links.length" class="links links--dark">
                  <a
                    v-for="l in p.links"
                    :key="l.href"
                    :href="l.href"
                    target="_blank"
                    rel="noopener"
                    >{{ l.label }}</a
                  >
                </p>
              </div>
            </div>
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
             it can sit in the gutter beside the shrunken card. Same text layout as
             a grid card: pills, title, role, description.
             Only the two bookend tracks ever rest, so only they need a caption —
             not rendering it on a fullscreen panel keeps a permanently invisible
             copy of the project text out of the DOM. -->
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

    <!-- fixed segmented progress rail: the one element on screen for the whole
         reel, so it carries the provenance badge as well as position -->
    <div class="hl-rail" :class="{ 'is-on': railOn }" aria-hidden="true">
      <span class="prov" :class="`is-${active.org}`">{{ active.org }}</span>
      <span class="hl-rail-name">{{ active.title }}</span>
      <span class="hl-segs">
        <span v-for="(p, i) in highlights" :key="p.key" class="hl-seg"><i :data-seg="i" /></span>
      </span>
      <span class="hl-rail-count">
        {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(highlights.length).padStart(2, '0') }}
      </span>
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
const { reduced, railOn, activeIndex, mediaIndex, setMedia, modeOf } = useHighlightReel(
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

   Phones keep the gradient bar (see the 900px block below): a content-sized
   panel would have to be nearly full width there anyway, and a blurred
   full-width overlay is a worse trade on a small, busy screen.

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

   DELIBERATE EXCEPTION to the single-dark rule: this panel, the vignette, the
   media-index chip and the progress rail all sit on top of arbitrary media
   rather than on the page, so they stay near-black rather than neutral-800. */
.hl-hud {
  position: absolute;
  left: var(--hud-inset);
  right: auto;
  bottom: 0;
  width: fit-content;
  max-width: var(--hud-max);
  padding: 1.8rem 2rem;
  background: rgb(0 0 0 / calc(.9 * var(--scrim)));
  backdrop-filter: blur(6px);
  border-radius: 24px 24px 0 0;
  opacity: var(--hud-o, 0);
  transform: translateY(var(--hud-y, 22px));
  pointer-events: var(--hud-pe, none);
}
.hl-hud .left {
  max-width: 62ch;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.hl-hud .hl-title {
  font-size: clamp(1.4rem, 2.4vw, 2.4rem);
}
.hl-hud .hl-desc {
  font-size: 0.92rem;
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
  @apply text-neutral-200;
}
.hl-desc {
  @apply text-neutral-300;
  font-size: clamp(0.86rem, 1.02vw, 1rem);
  line-height: 1.65;
  margin: 0;
  text-wrap: pretty;
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

/* ============================================================ progress rail */
.hl-rail {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 1.1rem;
  background: rgba(10, 10, 10, 0.85);
  border: 1px solid rgba(162, 242, 3, 0.25);
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-family: 'audiowide', sans-serif;
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  @apply text-neutral-300;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  backdrop-filter: blur(10px);
  white-space: nowrap;
}
.hl-rail.is-on {
  opacity: 1;
  pointer-events: auto;
}
.hl-rail-name {
  @apply text-primary-500;
}
.hl-segs {
  display: flex;
  gap: 6px;
}
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
   Below 900px the left gutter is too narrow for an editorial caption, so the
   caption moves under the card. */
@media (max-width: 900px) {
  .hl-reel {
    --s-rest: 0.62;
    --ty-rest: -8svh;
    --x-rest: 0vw;
    --gutter: 6vw;
  }
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
  /* The caption has to clear the rail pinned to the bottom, so long copy defers
     to the fullscreen HUD instead of being crammed in next to the card. */
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
  /* On a phone the HUD stacks tall and short, so a percentage gradient leaves
     the upper text in a weak scrim zone — a near-solid bottom panel is the
     standard mobile pattern. It backs off with the same --scrim knob as the
     desktop panel, and the vignette underneath is doing the rest.
     Everything that made it a content-sized container on a desktop is undone
     here: on a phone the panel would span nearly the whole width anyway, and a
     blurred full-width overlay is a worse trade on a small, busy screen. */
  .hl-hud {
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    max-width: none;
    border-radius: 0;
    backdrop-filter: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 5rem var(--gutter) 4.6rem;
    background: linear-gradient(
      to top,
      rgb(10 10 10 / calc(1 * var(--scrim))) 0%,
      rgb(10 10 10 / calc(0.97 * var(--scrim))) 58%,
      rgb(10 10 10 / calc(0.8 * var(--scrim))) 84%,
      rgb(10 10 10 / 0) 100%
    );
  }
  .hl-hud .hl-desc,
  .hl-hud .hl-role {
    display: block;
  }
  .hl-hud .hl-role {
    font-size: 0.62rem;
  }
  .hl-corners {
    inset: 1.6%;
  }
  /* top-right, so the media index fights neither the caption nor the rail */
  .hl-dots {
    top: 1.4rem;
    bottom: auto;
    right: var(--gutter);
  }
  /* The rail gained a provenance badge and no longer fits a phone. Drop the
     project name, tighten the segments and cap the width. */
  .hl-rail {
    gap: 0.5rem;
    padding: 0.42rem 0.7rem;
    font-size: 0.55rem;
    max-width: calc(100vw - 1.5rem);
  }
  .hl-rail-name {
    display: none;
  }
  .hl-rail .prov {
    font-size: 0.55rem;
    padding: 0.18rem 0.45rem;
    letter-spacing: 0.06em;
  }
  .hl-seg {
    width: 22px;
  }
  .hl-cover-name {
    font-size: clamp(1.6rem, 9vw, 2.6rem);
  }
}

/* ======================================================== REDUCED MOTION --
   Honour the OS setting: no scroll runway, no snap, no scale-up. Every track
   becomes the same plain fullscreen panel the middle of the reel already uses,
   so nothing on the page moves except the scroll itself, and the caption — which
   only ever existed to sit beside a moving card — steps aside for the HUD.
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
   text as the HUD, which is an overlay here, so showing both read as a
   duplicated title. */
.hl-reel.is-reduced .hl-copy {
  display: none;
}
.hl-reel.is-reduced .hl-hud {
  opacity: 1 !important;
  transform: none !important;
  pointer-events: auto !important;
}
.hl-reel.is-reduced .hl-dots {
  opacity: 1 !important;
  pointer-events: auto !important;
}
.hl-reel.is-reduced .hl-shot .fg {
  transform: none !important;
}
.hl-reel.is-reduced .hl-rail {
  display: none;
}
</style>
