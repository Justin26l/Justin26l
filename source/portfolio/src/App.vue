<template>

  <body class="m-0">
    <main class="flex flex-col items-center">
      <!-- <Intro /> -->

      <section id="profile" class="w-svw min-h-[80svh] bg-neutral-800">
        <Profile/>
      </section>


      <section id="clone" class="w-full bg-neutral-900 overflow-hidden">
        <DigitalClone/>
      </section>

      <section id="portfolio" class="w-full bg-white flex flex-col gap-6 mb-20 items-start">
        <BridgeTop />
        <Portfolio />
        <BridgeTop style="transform: scaleY(-1);" /> 
      </section>

      <section id="about" class="w-full flex flex-col items-center">
        <Journey />
      </section>

      <section id="skills" class="w-full flex flex-col items-center">
        <Skills />
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
  background-image: url("./assets/svg/plus.svg");
  background-repeat: repeat;
}
</style>

<script setup lang="ts">
import BridgeTop from './components/animated/BridgeTop.vue';
import Contact from './components/Contact.vue';
import DigitalClone from './components/DigitalClone.vue';
import Intro from './components/Intro.vue';
import Journey from './components/Journey.vue';
import Portfolio from './components/Portfolio.vue';
import Skills from './components/Skills.vue';
import Profile from './components/Profile.vue';
import Svgs from './components/svgs.vue';
</script>
