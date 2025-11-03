<script setup lang="ts">
import ShiftText from './animated/shiftText.vue';

</script>

<template>
  <div class="push-center">
    <div class="bg-white overflow-hidden rounded-4xl">
      <div class="flex flex-col items-center gap-4 w-full">

        <div class="flex justify-end w-full md:pe-12">
          <img src="./../assets/svg/contact-hand-up.svg" alt="contact vector"
            class="w-1/2 md:w-1/3 lg:w-1/4 h-full -rotate-30" />
        </div>

        <div class="flex flex-col lg:items-start lg:flex-row lg:justify-between lg:w-2/3">
          <h2 class="font-audiowide text-5xl text-center mb-4 lg:mt-4">Keep in touch !</h2>

          <div class="flex flex-col lg:items-start gap-4 text-4xl xl:pe-18">
            <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank"
              class="flex-centered gap-2 no-underline !text-blue-500 hover:!text-blue-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="w-8 h-8">
                <use xlink:href="#linkedin" />
              </svg>
              <ShiftText height="h-(--text-4xl)" text="LinkedIn"/>
            </a>
            <a href="https://github.com/Justin26l/" target="_blank"
              class="flex-centered gap-2 no-underline !text-neutral-800 hover:!text-black">
              <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="w-8 h-8">
                <use xlink:href="#github" />
              </svg>
              <ShiftText height="h-(--text-4xl)" text="Github"/>
            </a>
            <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank"
              class="flex-centered gap-2 no-underline !text-orange-600 hover:!text-orange-700">
              <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="w-8 h-8">
                <use xlink:href="#gitbook" />
              </svg>
              <ShiftText height="h-(--text-4xl)" text="Git Book"/>
            </a>
          </div>
        </div>

        <div class="flex justify-start w-full md:ps-12">
          <img src="./../assets/svg/contact-hand-down.svg" alt="contact vector"
            class="w-1/2 md:w-1/3 lg:w-1/4 h-full -rotate-30" />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-centered {
  @apply flex justify-center items-center;
}
</style>