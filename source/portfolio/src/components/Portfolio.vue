<template>
  <div class="push-center w-full flex flex-col gap-12 justify-center pb-20">
    <h1 class="heading-lg heading-padding font-audiowide bg-part-white">Portfolio</h1>

    <section id="project-grid" class="grid grid-cols-2 md:grid-cols-3 gap-1">
      
      <div class="project-card hightlight-border !rounded-3xl !p-1.5 bg-neutral-800 ">
        <div class="hightlight-border rounded-2xl h-full w-full !p-2 flex flex-col gap-2">
          <a href="#contact" class="no-underline">
            <p class="font-audiowide text-primary-500 text-4xl !my-2">Get In Touch With Me !</p>
          </a>
          <!-- <button class="btn btn-secondary w-fit"> Contact 1</button>
          <button class="btn btn-secondary w-fit"> Contact 2</button>
          <button class="btn btn-secondary w-fit"> Contact 3</button> -->
        </div>
      </div>

      <div v-for="project in projects" :class="project.class">
        <div class="project-card" @click="handleClick(project.title)">
          <div class="relative group w-full h-full">
            <img :src="project.image" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/80 flex flex-col items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4" :style="{ opacity: activeOverlay[project.title] ? 1 : undefined }">
              <p class="text-3xl font-bold">{{ project.title }}</p>
              <p class="mt-1">{{ project.type }}</p>
              <p class="mt-1">{{ project.description }}</p>
              <a :href="project.link" target="_blank" class="btn btn-secondary mt-4 text-lg">View More</a>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- <section id="project-list" class="flex flex-col gap-12">
      <div v-for="item in portfolioItems" class="flex flex-col md:flex-row md:justify-center w-full">
        <div class="flex-2 flex justify-end w-fit h-fit">
              <a :href="item.link" target="_blank" class="flex project-card hover-border" @click="handleClick($event, item.title)">
                <img :src="item.image" class="!rounded-xl w-full !border-1 !border-neutral-300" />
              </a>
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
    </section> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const projects = [
  {
    title: 'Spents mobile app',
    type: 'Fullstack Application Development',
    myRole: 'Tech Research, Mobile & Cross Platform Dev, Backend Dev, UI UX Designer',
    description: 'Spents is a personal ledger app. This a POC of Offline-First architecture and practice of my UI/UX design skill.',
    link: 'https://www.figma.com/proto/10eFNWDmh8LXMNzGLG0DL2/Spents?node-id=35120-46175&p=f&t=6G6plvh3j3SlMfFa-1&scaling=scale-down&content-scaling=fixed&page-id=16537%3A45869&starting-point-node-id=35120%3A46175',
    image: 'img/spentsMobile.png',
    class: 'order-1 md:order-2 row-span-2 !rounded-[4svw] overflow-clip',
    highlight: true,
  },
  {
    title: 'xxxTerminal.com',
    type: 'SAAS, micro-services',
    myRole: 'Full Stack Engineer & Marketer',
    description: 'this is a platform that provide algo trading solutions. let trader run trading bots in ease, reduce software skill requirement for traders.',
    link: '/sites/xxxterminal/home.html',
    image: 'img/xxxTerminal.png',
    class: 'order-4 col-span-2 !rounded-2xl overflow-clip',
    highlight: true,
  },
  {
    title: 'VeryExpress',
    type: 'Development Tool',
    myRole: 'Software Engineer',
    description: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'https://github.com/Justin26l/VeryExpress',
    link2: 'https://www.npmjs.com/package/very-express',
    image: 'img/vex.png',
    class: 'order-2 md:order-1 !rounded-4xl overflow-clip',
    highlight: true,
  },
];

const activeOverlay = reactive<Record<string, boolean>>({});

function handleClick(key: string) {
  // active the clicked one
  activeOverlay[key] = !activeOverlay[key];

  // remove all other overlays
  for (const k in activeOverlay) {
    if (k !== key) activeOverlay[k] = false;
  };
}
</script>

<style scoped>
@reference "../assets/css/style.css";

.hover-border {
  @apply duration-200 ease-in-out border-4 border-transparent hover:border-primary-600;
}

.project-card {
  @apply flex items-center w-full h-full rounded-xl overflow-clip;
}

.hightlight-border {
  @apply border-4 border-primary-500;
}

text-title {
  @apply text-4xl font-bold mb-3;
}

text-label {
  @apply text-sm text-neutral-500;
}

text-value {
  @apply text-xl ps-4;
}

text-detail {
  @apply text-base text-neutral-800 ps-4;
}
</style>