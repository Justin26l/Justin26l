<script setup lang="ts">
import BlockText from './animated/blockText.vue';
import ShiftText from './animated/shiftText.vue';

</script>

<template>

  <div class="bg-texture flex flex-col md:flex-row justify-center items-center w-vw min-h-[85svh] gap-4 lg:gap-8 text-white">

    <div class="bg-corners m-8 md:my-4 lg:my-12 xl:my-18">
      <div class=" flex overflow-clip rounded-2xl md:rounded-3xl lg:rounded-4xl bg-neutral-100 m-4 ">
        <img src="/img/profilePic.png" alt="Justin Lai" class="relative z-30 w-[60vw] md:w-[30vw] xl:w-[24vw]" />
      </div>
    </div>

    <div class="flex flex-col gap-2 ps-2">

      <p class="heading-lg font-audiowide text-primary-500 my-4 opacity-0 flow-up">Justin Lai</p>
      <div class="flex flex-col gap-3 heading ps-8 pb-6">
        <BlockText class="ms-0" text="Software Developer" :delay="0" />
        <BlockText class="ms-8" text="Frontend Engineer" :delay="1" />
        <BlockText class="ms-0" text="Backend Engineer" :delay="2" />
        <BlockText class="ms-8" text="UI & UX Designer" :delay="3" />
      </div>

      <div class="ps-8 flex flex-row gap-4 pb-12">

        <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank"
          class="icon-container z-30 opacity-0 flow-in ani-delay-1500 bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="icon text-white">
            <use xlink:href="#linkedin" />
          </svg>
        </a>

        <a href="https://github.com/Justin26l/" target="_blank"
          class="icon-container z-20 opacity-0 flow-in ani-delay-1600 bg-neutral-900">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="icon text-white">
            <use xlink:href="#github" />
          </svg>
        </a>

        <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank"
          class="icon-container z-10 opacity-0 flow-in ani-delay-1700 bg-orange-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="icon text-white">
            <use xlink:href="#gitbook" />
          </svg>
        </a>

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