<template>
  <Splide :options="{ 
    rewind: true, 
    useScroll: true, 
    perPage: 2, 
    breakpoints: {
      640: {
			  destroy: true,
      },
    }
  }" aria-label="My Favorite Images" >
    <SplideSlide v-for="(item, index) in portfolioItems" :key="index">
      <div class="w-full px-4 lg:px-8 xl:px-16">
        <p class="text-4xl mb-0">{{ item.title }}</p>
        <p class="text-lx">{{ item.description }}</p>
        <p class="font-ariel">{{ item.details }}</p>
        <a class="link" :href="item.link">View More</a>
        <a :href="item.link">
          <img :src="item.image" alt="xxxTerminal" class="w-full mt-6" />
        </a>
      </div>
    </SplideSlide>
  </Splide>
</template>
<script setup lang="ts">

import { Splide, SplideSlide } from '@splidejs/vue-splide';

const portfolioItems = [
  {
    title: 'xxxTerminal.com',
    description: 'Saas, Website Development',
    details: 'Provide algo trading solutions. let traders manage trading bots in ease, simplify software & infrastructure.',
    link: 'xxxterminalDemo.html',
    image: 'img/xxxTerminal.png'
  },
  {
    title: 'VeryExpress',
    description: 'DevTool',
    details: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'veryExpressDemo.html',
    image: 'img/placeholder.png'
  },
  {
    title: 'VeryExpress2',
    description: 'DevTool',
    details: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'veryExpressDemo.html',
    image: 'img/placeholder.png'
  }
];
</script>
