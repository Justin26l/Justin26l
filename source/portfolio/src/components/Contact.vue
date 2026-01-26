<template>
  <div id="contact" class="push-center">
    <div class="bg-white overflow-hidden rounded-4xl">
      <div class="flex flex-col items-center gap-4 w-full">

        <div class="flex justify-end w-full md:pe-12">
          <img src="./../assets/svg/contact-hand-up.svg" alt="contact vector"
            class="w-1/2 md:w-1/3 lg:w-1/4 h-full -rotate-30" />
        </div>

        <div class="flex flex-col items-center lg:flex-row lg:gap-8 xl:gap-16">
          <h2 class="font-audiowide text-5xl text-center mb-4 lg:mt-4">Keep in touch !</h2>

          <div class="flex flex-col lg:items-start gap-4 text-4xl">
            <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank"
              class="flex-centered flex-row gap-2 no-underline !text-blue-500 hover:!text-blue-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="w-8 h-8">
                <use xlink:href="#linkedin" />
              </svg>
              <ShiftText height="h-(--text-4xl)" text="LinkedIn"/>
            </a>
            <a href="https://github.com/Justin26l/" target="_blank"
              class="flex-centered flex-row gap-2 no-underline !text-neutral-800 hover:!text-black">
              <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="w-8 h-8">
                <use xlink:href="#github" />
              </svg>
              <ShiftText height="h-(--text-4xl)" text="Justin26l"/>
            </a>
            <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank"
              class="flex-centered flex-row gap-2 no-underline !text-orange-600 hover:!text-orange-700">
              <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="w-8 h-8">
                <use xlink:href="#gitbook" />
              </svg>
              <ShiftText height="h-(--text-4xl)" text="Justin SE Docs"/>
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

<script setup lang="ts">
import ShiftText from './animated/shiftText.vue';

</script>