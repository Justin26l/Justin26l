<script setup lang="ts">
import BlockText from './animated/blockText.vue';

</script>

<template>

  <div class="bg-texture flex flex-col md:flex-row justify-center items-center w-vw min-h-[85svh] md:pt-[10svh] gap-4 lg:gap-8 text-white ">

    <div class="bg-corners m-8 md:my-4 lg:my-12 xl:my-18 mb-0">
      <div class=" flex overflow-clip rounded-2xl md:rounded-3xl lg:rounded-4xl bg-gray-100 m-4 ">
        <img src="/img/profilePic.png" alt="Justin Lai" class="relative z-30 w-[60vw] md:w-[30vw] xl:w-[26vw]" />
      </div>

      <div class="flex flex-row justify-center gap-6 py-3 md:pt-8 md:pb-12">

        <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank"
          class="icon-container z-30 opacity-0 flow-in ani-delay-600 bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="icon text-white">
            <use xlink:href="#linkedin" />
          </svg>
        </a>

        <!-- GitHub's chip: dark, but dark here means neutral-800 with a rim, since
             the band behind it is neutral-800 too. -->
        <a href="https://github.com/Justin26l/" target="_blank"
          class="icon-container z-20 opacity-0 flow-in ani-delay-400 bg-neutral-800 border border-neutral-600">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="icon text-white">
            <use xlink:href="#github" />
          </svg>
        </a>

        <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank"
          class="icon-container z-10 opacity-0 flow-in ani-delay-200 bg-orange-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="icon text-white">
            <use xlink:href="#gitbook" />
          </svg>
        </a>

      </div>
    </div>

    <div class="flex flex-col gap-2 ps-2 md:pt-10">
      <p class="heading-xl font-audiowide text-primary-500 my-4 opacity-0 flow-up">Justin Lai</p>

      <span class="heading-sm text-secondary-500">* Professionals</span>
      <div class="flex flex-col gap-4 heading-md ps-10 pb-6">
        <BlockText text='Mid-Senior Software Engineer' :delay="0" />
        <BlockText text='System & UI/UX Designer' :delay="2" />
      </div>

      <span class="heading-sm text-secondary-500">* Hobbies</span>
      <div class="flex flex-col gap-4 heading-md ps-10 pb-6">
        <BlockText text='UAV & Aerospace' :delay="3" />
        <BlockText text='Biomimetic Robotic' :delay="4" />
      </div>
    </div>
  </div>

</template>
<style scoped>
.bg-texture {
  background-image: url("@/assets/svg/backgroundTexture.svg");
  background-repeat: repeat;
}

.bg-corners {
  background-image: url("@/assets/svg/corner.svg");
  background-repeat: no-repeat;
  /* fill content */
  background-size: 100%;
}
</style>