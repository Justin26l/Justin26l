<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 w-full">
    <template v-for="(img, i) in images" :key="i">
      <img :src="img" alt="Bridge Bottom SVG" class="w-full !rounded-none" />
    </template>
  </div>
</template>

<script setup>
import bridge1 from '@/assets/svg/Bridge-bottom-1.svg';
import bridge2 from '@/assets/svg/Bridge-bottom-2.svg';

const images = [bridge1, bridge2];

if (window.innerWidth >= 1024){
  images.push(bridge1);
}
</script>