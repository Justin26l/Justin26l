<template>
  <div class="grid">
    <article v-for="p in projects" :key="p.key" class="card">
      <div class="thumb">
        <img v-if="thumbOf(p)" :src="thumbOf(p)" :alt="p.title" loading="lazy" />
        <!-- no screenshot yet: a typographic cover rather than an empty box -->
        <span v-else class="cover font-audiowide">{{ p.title }}</span>
      </div>

      <!-- pills, in a fixed order: year, type, org -->
      <ul class="pills pills--light">
        <li>{{ p.year }}</li>
        <li>{{ p.type }}</li>
        <li class="org" :class="`is-${p.org}`">{{ ORG[p.org].short }}</li>
      </ul>

      <h3 class="font-audiowide">{{ p.title }}</h3>
      <p class="role">{{ p.role }}</p>
      <p class="desc">{{ p.description }}</p>

      <p v-if="p.links && p.links.length" class="links links--light">
        <a
          v-for="l in p.links"
          :key="l.href"
          :href="l.href"
          target="_blank"
          rel="noopener"
          >{{ l.label }}</a
        >
      </p>
    </article>
  </div>
</template>

<script setup>
import { ORG } from '../data/projects.js'

const props = defineProps({
  /** Projects to render (already filtered to non-highlights). */
  projects: { type: Array, required: true },
})

/* a project may nominate a different image for the landscape grid thumbnail
   than the one the reel opens with; otherwise the first still is used. Clips are
   skipped — an <img> cannot render one, and the grid only shows stills. */
const thumbOf = p =>
  p.thumb || (p.media.find(m => m.type !== 'video') || {}).src || null
</script>

<style scoped>
@reference "../assets/css/style.css";

/* ============================================================================
   PROJECT GRID
   Flat and quiet on purpose: no card chrome, no border, no background. The
   thumbnail carries the weight and the text sits directly on the band, so the
   grid reads as a list of work rather than a wall of boxes.
   ========================================================================== */
.grid {
  display: grid;
  gap: 3rem 1.5rem;
  grid-template-columns: 1fr;
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
}

.thumb {
  position: relative;
  overflow: hidden;
  border-radius: 0.25rem;
  aspect-ratio: 16 / 9;
  /* dark ground for the typographic cover; dark means neutral-800 */
  @apply bg-neutral-800;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.card:hover .thumb img {
  transform: scale(1.04);
}
.cover {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  text-align: center;
  @apply text-primary-500;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
}

/* ---- text ---------------------------------------------------------------- */
.card h3 {
  margin: 1rem 0 0;
  font-size: 1.3rem;
  line-height: 1.2;
  @apply text-neutral-900;
  text-wrap: balance;
}
.role {
  margin: 0.45rem 0 0;
  font-size: 0.8rem;
  @apply text-neutral-500;
}
.desc {
  margin: 0.6rem 0 0;
  font-size: 0.92rem;
  line-height: 1.6;
  @apply text-neutral-600;
  text-wrap: pretty;
}
/* .pills and .links are shared with the reel — see assets/css/projects.css */
</style>
