<template>

  <body class="m-0">
    <main class="flex flex-col items-center">
      <!-- <Intro /> -->

      <section id="profile" class="w-svw min-h-[80svh] bg-neutral-800">
        <Profile/>
      </section>

      <BridgeTop/>

      <section id="portfolio" class=" w-full flex flex-col gap-6 pb-20 items-start">
        <Portfolio />
      </section>

      <BridgeBottom/>

      <section id="about" class="w-full flex flex-col items-center">
        <Journey />
      </section>

      <section id="contact" class="w-full bg-neutral-800 plus-grid flex justify-center items-center py-20 ">
        <Contact />
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
import BridgeBottom from './components/BridgeBottom.vue';
import BridgeTop from './components/BridgeTop.vue';
import Contact from './components/Contact.vue';
import Intro from './components/Intro.vue';
import Journey from './components/Journey.vue';
import Portfolio from './components/Portfolio.vue';
import Profile from './components/Profile.vue';
import Svgs from './components/svgs.vue';
</script>
