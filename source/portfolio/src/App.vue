<template>

  <body class="m-0">
    <main class="flex flex-col items-center">
      <Intro />

      <!-- <Fancy class="w-full flex justify-center"> -->
        <section id="profile" class="my-6 push-center">
          <Profile/>
        </section>
      <!-- </Fancy> -->

      <section id="portfolio" class="bg-vibrant w-full flex flex-col gap-6 pb-20 items-start">
        <SectionHeader value="Portfolio" />

        <div id="portfolioItems" class=" text-white dark:text-black">
          <Portfolio class="w-full" />
        </div>
      </section>

      <section id="about" class="w-full flex flex-col items-center pb-6">
        <SectionHeader value="Journey" />
        <Journey />
      </section>

      <section id="contact" class="w-full bg-vibrant plus-grid flex justify-center items-center py-20 ">
        <Contact />
      </section>

    </main>

    <Svgs/>
  </body>

</template>

<style scoped>
@reference "./assets/css/style.css";

.bg-vibrant{
  @apply bg-neutral-800 dark:bg-neutral-200;
}

.plus-grid {
  background-image: url("./assets/SVG/plus.svg");
  background-repeat: repeat;
}
</style>

<script setup lang="ts">
import Contact from './components/Contact.vue';
import Intro from './components/Intro.vue';
import Journey from './components/Journey.vue';
import Portfolio from './components/Portfolio.vue';
import Profile from './components/Profile.vue';
import SectionHeader from './components/SectionHeader.vue';
import Svgs from './components/svgs.vue';
</script>
