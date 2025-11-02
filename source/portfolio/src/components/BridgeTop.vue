<template>
  <div class="flex flex-row w-full">
    <div v-for="i in length" :key="i" class="w-full">
      <svg v-if="i % 2 === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 144" fill="none" class="w-full">
        <g clip-path="url(#a)">
          <path d="M384 93h48v51h-48z" fill="#262626" />
          <path d="M624 47h48v49h-48z" class="lime-breath" :style="`animation-delay: ${i + .8}s;`"
            fill="currentColor" />
          <path
            d="M48 95h48v49H48zm96 0h48v49h-48zm624-1h48v50h-48zm144 0h48v50h-48zM384 47h48v49h-48zm48 0h48v49h-48zm96 0h48v49h-48zm144 0h48v49h-48zm48 0h48v49h-48z"
            fill="#262626" />
          <path d="M816 47h48v49h-48zm48 0h48v49h-48zm48 0h48v49h-48z" fill="#262626" />
          <path d="M48 47h48v49H48zm144 48h48v49h-48z" class="lime-breath" :style="`animation-delay: ${i + .2}s;`"
            fill="currentColor" />
          <path d="M0 47h48v49H0zm96 0h48v49H96zm48 0h48v49h-48zm48 0h48v49h-48zm48 0h48v49h-48zm48 0h48v49h-48z"
            fill="#262626" />
          <path d="M768 47h48v49h-48z" class="lime-breath" :style="`animation-delay: ${i + 1}s;`"
            fill="currentColor" />
          <path d="M0 0h48v48H0zm48 0h48v48H48zm48 0h48v48H96zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48z"
            fill="#262626" />
          <path d="M288 0h48v48h-48z" class="lime-breath" :style="`animation-delay: ${i + .4}s;`"
            fill="currentColor" />
          <path d="M336 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48z" fill="#262626" />
          <path d="M528 0h48v48h-48z" class="lime-breath" :style="`animation-delay: ${i + .6}s;`"
            fill="currentColor" />
          <path
            d="M576 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48z"
            fill="#262626" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h960v144H0z" />
          </clipPath>
        </defs>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 144" fill="none" class="w-full">
        <g clip-path="url(#a)">
          <path d="M480 93h48v51h-48z" fill="#262626" />
          <path d="M480 46h48v50h-48zM48 46h48v50H48zm288 0h48v50h-48z" class="lime-breath"
            :style="`animation-delay: ${i + .2}s;`" fill="currentColor" />
          <path d="M480 46h48v50h-48zm336 0h48v50h-48z" class="lime-breath" :style="`animation-delay: ${i + .6}s;`"
            fill="currentColor" />
          <path d="M96 93h48v51H96zm576 3h48v48h-48zm96 0h48v48h-48zm144-3h48v51h-48z" fill="#262626" />
          <path
            d="M96 46h48v50H96zm48 0h48v50h-48zm144 0h48v50h-48zM0 46h48v50H0zm384 0h48v50h-48zm144 0h48v50h-48zm48 0h48v50h-48zm48 0h48v50h-48zm240 0h48v50h-48zm48 0h48v50h-48z"
            fill="#262626" />
          <path d="M0 0h48v48H0zm48 0h48v48H48zm48 0h48v48H96zm48 0h48v48h-48zm48 0h48v48h-48z" fill="#262626" />
          <path d="M240 0h48v48h-48z" class="lime-breath" :style="`animation-delay: ${i + .4}s;`"
            fill="currentColor" />
          <path
            d="M288 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48z"
            fill="#262626" />
          <path d="M720 0h48v48h-48z" class="lime-breath" :style="`animation-delay: ${i + .8}s;`"
            fill="currentColor" />
          <path
            d="M768 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zm48 0h48v48h-48zM720 48h48v48h-48zM240 96h48v48h-48z"
            fill="#262626" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h960v144H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';

const length = computed(() => Math.ceil(window.innerWidth / 512));

</script>

<style scoped>
.lime-breath {
  color: #ffffff;
  animation: breath 3s ease-in-out infinite;
}

@keyframes breath {

  0%,
  25%,
  75%,
  100% {
    color: #ffffff;
  }

  
  50% {
    color: #7FBE00;
  }
}
</style>