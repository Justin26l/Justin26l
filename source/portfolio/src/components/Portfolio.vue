<template>
  <div class="bg-neutral-100 w-full">
    <div class="push-center flex flex-col gap-12 justify-center pb-20">
      <h1 class="heading-lg heading-padding font-audiowide">Portfolio</h1>

      <div class="grid grid-cols-3 gap-1 w-full px-2">
        <div class="project-card hightlight-border !rounded-3xl  !p-1.5 bg-neutral-800 ">
          <div class="hightlight-border rounded-2xl h-full !p-2 flex flex-col gap-2">
            <a href="#contact" class="no-underline">
              <p class="font-audiowide text-primary-500 text-4xl !mb-2">Get In Touch With Me !</p>
            </a>
            <button class="btn btn-secondary w-fit"> Contact 1</button>
            <button class="btn btn-secondary w-fit"> Contact 2</button>
            <button class="btn btn-secondary w-fit"> Contact 3</button>
          </div>
        </div>
        <div>
          <a :href="BannerItems.veryExpress.link" target="_blank" class="project-card">
            <img :src="BannerItems.veryExpress.image" class="!rounded-xl w-full h-full !border-1 !border-neutral-300" />
          </a>
        </div>
        <div class="row-span-2">
          <a :href="BannerItems.spents.link" target="_blank" class="project-card">
            <img :src="BannerItems.spents.image" class="!rounded-xl h-full !border-1 !border-neutral-300" />
          </a>
        </div>
        <div class="col-span-2">
          <a :href="BannerItems.xxxTerminal.link" target="_blank" class="project-card">
            <img :src="BannerItems.xxxTerminal.image" class="!rounded-xl w-full !border-1 !border-neutral-300" />
          </a>
        </div>
      </div>

      <div v-for="item in portfolioItems" class="flex flex-col md:flex-row md:justify-center w-full px-2 lg:px-4 xl:px-8">
        <div class="flex-2 flex justify-end">
          <div>
            <a :href="item.link" target="_blank" class="flex aspect-[16/9] project-card hover-border">
              <img :src="item.image" class="!rounded-xl w-full !border-1 !border-neutral-300" />
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
const BannerItems = {
  spents: {
    title: 'Spents app',
    type: 'Fullstack Product Development',
    myRole: 'Tech Research, Mobile & Cross Platform Dev, Backend Dev, UI UX Designer',
    description: 'Spents is a personal ledger app. This my side project to practice my UI/UX design skill, also POC of Offline-First architecture.',
    link: 'https://www.figma.com/proto/10eFNWDmh8LXMNzGLG0DL2/Spents?node-id=35120-46175&p=f&t=6G6plvh3j3SlMfFa-1&scaling=scale-down&content-scaling=fixed&page-id=16537%3A45869&starting-point-node-id=35120%3A46175',
    image: 'img/spents.jpg'
  },
  xxxTerminal: {
    title: 'xxxTerminal.com',
    type: 'Saas, Website',
    myRole: 'Full Stack Engineer & Marketer',
    description: 'this is a platform that provide algo trading solutions. let trader run trading bots in ease, reduce software skill requirement for traders.',
    link: 'xxxterminalDemo.html',
    image: 'img/xxxTerminal.png'
  },
  veryExpress: {
    title: 'VeryExpress',
    type: 'Development Tool',
    myRole: 'Software Engineer',
    description: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'veryExpressDemo.html',
    image: 'img/placeholder.png'
  },
};

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
  // {
  //   title: 'Spents app',
  //   type: 'Fullstack Product Development',
  //   myRole: 'Tech Research, Mobile & Cross Platform Dev, Backend Dev, UI UX Designer',
  //   description: 'Spents is a personal ledger app. This my side project to practice my UI/UX design skill, also POC of Offline-First architecture.',
  //   link: 'https://www.figma.com/proto/10eFNWDmh8LXMNzGLG0DL2/Spents?node-id=35120-46175&p=f&t=6G6plvh3j3SlMfFa-1&scaling=scale-down&content-scaling=fixed&page-id=16537%3A45869&starting-point-node-id=35120%3A46175',
  //   image: 'img/spents.jpg'
  // }
];
</script>

<style scoped>
@reference "../assets/css/style.css";

.hover-border {
  @apply duration-200 ease-in-out border-4 border-transparent hover:border-primary-600;
}

.project-card {
  @apply flex items-center w-full h-full rounded-2xl p-1 overflow-clip;
}

.hightlight-border {
  @apply border-4 border-primary-500;
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