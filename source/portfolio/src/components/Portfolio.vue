<template>
  <div class="pf">
    <!-- ======================== dark band: the title AND the work ==========
         One continuous dark block, so a colour change never separates the title
         from the projects it introduces. Dark bands carry no bridges — the
         brick transitions belong to the light sections on either side. -->
    <div class="pf-dark">
      <div class="section-head">
        <h1 class="section-title section-title--dark">Selected Work</h1>
      </div>

      <HighlightReel :highlights="HIGHLIGHTS" />

      <!-- breathing room at the end of the reel, before the light band -->
      <div class="pf-reel-tail" aria-hidden="true" />
    </div>

    <!-- ======================== light band: other builds ==================
         A light section owns its bridges, top and bottom. -->
    <div class="pf-grid">
      <BridgeTop />

      <div class="pf-grid-inner">
        <div class="section-head">
          <h1 class="section-title section-title--light">Other Builds</h1>
        </div>

        <div class="push-center">
          <ProjectGrid :projects="OTHERS" />
        </div>
      </div>

      <BridgeTop style="transform: scaleY(-1)" />
    </div>
  </div>
</template>

<script setup>
import BridgeTop from './animated/BridgeTop.vue'
import HighlightReel from './HighlightReel.vue'
import ProjectGrid from './ProjectGrid.vue'
import { HIGHLIGHTS, OTHERS } from '../data/projects.js'
</script>

<style scoped>
@reference "../assets/css/style.css";

/* Dark sections use neutral-800 and nothing else. */
.pf-dark {
  @apply bg-neutral-800;
  /* --reel-tail is the dark breath between the last highlight and the light band */
  --reel-tail: 24vh;
}

.pf-reel-tail {
  height: var(--reel-tail);
}

/* Light sections use gray-100, and carry their own bridges. */
.pf-grid {
  @apply bg-gray-100;
}

.pf-grid-inner {
  /* the .section-head above supplies the top spacing; this is the band's foot */
  padding-bottom: 6rem;
}
</style>
