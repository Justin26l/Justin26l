<template>
  <div
    id="intro"
    class="z-100 fixed flex flex-row h-full w-full"
    v-show="showIntro"
  >
    <div
      v-for="(bar, i) in bars"
      :key="i"
      class="intro-bar bg-neutral-100 dark:bg-black h-full transition-all ease-in-out"
      :class="bar.colorClass"
      :style="{ opacity: bar.opacity, transitionDelay: '150ms'}"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

const BAR_COUNT = 26; // Adjust as needed
const showIntro = ref(true);

type Bar = {
  colorClass: string;
  opacity: string;
};

const bars = ref<Bar[]>(
  Array.from({ length: BAR_COUNT }, () => ({
    colorClass: "",
    opacity: "1",
  }))
);

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

onMounted(async () => {
  await nextTick();
  const len = bars.value.length;
  let pos = Math.floor(len / 2);
  let neg = Math.floor(len / 2);
  let curr = 0;

  for (let i = 0; i < len; i++) {
    setTimeout(() => {
      
      if (i === 0) {
        curr = neg;
      } else if (i % 2 === 0) {
        pos += 1;
        curr = pos;
                console.log('pos', curr);
      } else {
        neg -= 1;
        curr = neg;
                console.log('neg', curr);
      }

      // Set color class
      bars.value[curr].colorClass = isDarkMode()
        ? "!bg-lime-500"
        : "!bg-blue-600";
      // Set opacity
      bars.value[curr].opacity = "0";

    }, i * 20);
  }

  setTimeout(() => {
    showIntro.value = false;
  }, len * 60);
});
</script>