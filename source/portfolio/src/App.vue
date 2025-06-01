<template>

  <body class="m-0">
    <Intro />

    <Header />

    <main class="mt-6 flex flex-col gap-6 items-center">

      <section id="profile" class="push-center">
        <Profile/>
      </section>

      <section id="portfolio" class="bg-neutral-800 dark:bg-neutral-200 w-full flex flex-col gap-6 pb-20 items-start">
        <SectionHeader value="Portfolio" />

        <div id="portfolioItems" class=" text-white dark:text-black">
          <Portfolio class="w-full" />
        </div>
      </section>

      <section id="about" class="w-full flex flex-col items-center">
        <SectionHeader value="Journey" />
        <Journey />
      </section>

      <section id="contact" class="w-full plus-grid flex justify-center items-center py-20 ">
        <div class="push-center w-full">
          <div class="bg-white dark:bg-black border overflow-hidden rounded-md">
          <Contact />
          </div>
        </div>
      </section>

    </main>

    <Svgs/>
  </body>

</template>

<style scoped>
.plus-grid {
  background-image: url("./assets/SVG/plus.svg");
  background-repeat: repeat;
}
</style>

<script setup lang="ts">
import Contact from './components/Contact.vue';
import Header from './components/Header.vue';
import Intro from './components/Intro.vue';
import Journey from './components/Journey.vue';
import Portfolio from './components/Portfolio.vue';
import Profile from './components/Profile.vue';
import SectionHeader from './components/SectionHeader.vue';
import Svgs from './components/svgs.vue';
</script>
