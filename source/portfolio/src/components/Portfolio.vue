<template>
  <div class="bg-neutral-100 w-full">
    <div class="push-center flex flex-col gap-12 justify-center pb-20">
      <h1 class="heading-lg heading-padding font-audiowide">Portfolio</h1>

      <div v-for="item in portfolioItems" class="flex flex-col md:flex-row md:justify-center w-full px-4 lg:px-8 xl:px-16">
        <div class="flex-1 flex justify-end">
          <a :href="item.link" class="max-h-[50svh] aspect-[16/9] block rounded-2xl p-1 hover-border">
            <img :src="item.image" alt="xxxTerminal" class="!rounded-xl w-full h-full !border-1 !border-neutral-300" />
          </a>
        </div>
        <div class="flex-2 flex flex-col items-start gap-2 px-4">
          <p class="text-4xl my-0">{{ item.title }}</p>
          <p class="text-xl my-0">{{ item.description }}</p>
          <p class="text-xl my-0">{{ item.myRole }}</p>
          <p>{{ item.details }}</p>
          <a class="link" :href="item.link">View More</a>
        </div>  
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const portfolioItems = [
  {
    title: 'xxxTerminal.com',
    description: 'Saas, Website',
    myRole: 'Full Stack Engineer & Marketer',
    details: 'this is a platform that provide algo trading solutions. let trader run trading bots in ease, reduce software skill requirement for traders.',
    link: 'xxxterminalDemo.html',
    image: 'img/xxxTerminal.png'
  },
  {
    title: 'VeryExpress',
    description: 'Development Tool',
    myRole: 'Software Engineer',
    details: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'veryExpressDemo.html',
    image: 'img/placeholder.png'
  }
];
</script>

<style scoped>
@reference "../assets/css/style.css";

.hover-border {
  @apply duration-200 ease-in-out border-4 border-transparent hover:border-primary-600
}
</style>