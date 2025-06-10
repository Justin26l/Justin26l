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
          <img :src="item.image" alt="xxxTerminal" class="mt-6 w-full transition-all duration-200 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_12px_4px_rgba(0,0,0,0.15)]" />
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
    description: 'Saas, Website',
    details: 'Provide algo trading solutions. let traders manage trading bots in ease, simplify software & infrastructure.',
    link: 'xxxterminalDemo.html',
    image: 'img/xxxTerminal.png'
  },
  {
    title: 'VeryExpress',
    description: 'Developer Tool',
    details: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'veryExpressDemo.html',
    image: 'img/placeholder.png'
  }
];
</script>
