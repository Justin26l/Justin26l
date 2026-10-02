<template>

  <body class="m-0">
    <!-- outside <main>: a fixed overlay should not be a flex child of the page -->
    <!-- <SplashScreen /> -->

    <main class="flex flex-col items-center">
      <section id="profile" class="w-full min-h-[80svh] bg-neutral-800">
        <Profile/>
      </section>


      <!-- Light section: gray-100, and it owns its bridges — top and bottom.
           Dark sections carry none. -->
      <section id="clone" class="w-full bg-gray-100 overflow-hidden">
        <BridgeTop />
        <DigitalClone/>
        <BridgeTop style="transform: scaleY(-1)" />
      </section>

      <!-- Portfolio renders two bands itself: a neutral-800 band holding the
           title and the reel, then a gray-100 band with the grid. Each light
           band brings its own bridges. -->
      <section id="portfolio" class="w-full mb-20">
        <Portfolio />
      </section>

      <section id="about" class="w-full flex flex-col items-center">
        <Journey />
      </section>

      <!-- <section id="skills" class="w-full flex flex-col items-center">
        <Skills />
      </section> -->

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
import SplashScreen from './components/SplashScreen.vue';
import Journey from './components/Journey.vue';
import Portfolio from './components/Portfolio.vue';
// import Skills from './components/Skills.vue';
import Profile from './components/Profile.vue';
import Svgs from './components/svgs.vue';
</script>
