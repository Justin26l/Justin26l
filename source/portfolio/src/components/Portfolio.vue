<template>
  <div class="bg-neutral-100 w-full">
    <div class="push-center flex flex-col gap-12 justify-center pb-20">
      <h1 class="heading-lg heading-padding font-audiowide">Portfolio</h1>

      <div v-for="item in portfolioItems" class="flex flex-col md:flex-row md:justify-center w-full px-2 lg:px-4 xl:px-8">
        <div class="flex-2 flex justify-end">
          <div>
            <a :href="item.link" target="_blank" class="flex items-center w-full aspect-[16/9] rounded-2xl p-1 hover-border">
              <img :src="item.image" alt="xxxTerminal" class="!rounded-xl w-full !border-1 !border-neutral-300" />
            </a>
          </div>
        </div>
        <div class="flex-3 flex flex-col items-start gap-1 px-4">
          <text-title>{{ item.title }}</text-title>

          <text-label>Project Type</text-label>
          <text-value>{{ item.type }}</text-value>

          <text-label>My Role</text-label>
          <text-value>{{ item.myRole }}</text-value>

          <text-label>Description</text-label>
          <text-detail>{{ item.description }}</text-detail>
          <a class="link" :href="item.link" target="_blank">View More</a>
        </div>  
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const portfolioItems = [
  {
    title: 'xxxTerminal.com',
    type: 'Saas, Website',
    myRole: 'Full Stack Engineer & Marketer',
    description: 'this is a platform that provide algo trading solutions. let trader run trading bots in ease, reduce software skill requirement for traders.',
    link: 'xxxterminalDemo.html',
    image: 'img/xxxTerminal.png'
  },
  {
    title: 'VeryExpress',
    type: 'Development Tool',
    myRole: 'Software Engineer',
    description: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'veryExpressDemo.html',
    image: 'img/placeholder.png'
  },
  {
    title: 'Expenses record app Wireframe',
    type: 'UX Design Wireframe',
    myRole: 'UX Designer',
    description: 'This is a side project to practice my UI/UX design & Frontend development skill, this wireframe made with Figma and the UI & Mobile App is under construction.',
    link: 'https://www.figma.com/proto/10eFNWDmh8LXMNzGLG0DL2/Spents?node-id=35120-46175&p=f&t=6G6plvh3j3SlMfFa-1&scaling=scale-down&content-scaling=fixed&page-id=16537%3A45869&starting-point-node-id=35120%3A46175',
    image: 'img/spents.jpg'
  }
];
</script>

<style scoped>
@reference "../assets/css/style.css";

.hover-border {
  @apply duration-200 ease-in-out border-4 border-transparent hover:border-primary-600
}

text-title{
  @apply text-4xl font-bold mb-3;
}
text-label{
  @apply text-sm text-neutral-500 ;
}

text-value{
  @apply text-xl ps-4 ;
}

text-detail{
  @apply text-base text-neutral-800 ps-4 ;
}
</style>