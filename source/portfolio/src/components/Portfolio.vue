<template>
  <div class="push-center w-full flex flex-col gap-12 justify-center pb-20">
    <h1 class="heading-lg heading-padding font-audiowide bg-part-white">Portfolio</h1>

    <!-- Featured project -->
    <article class="featured-card">
      <div class="media">
        <div class="glow" aria-hidden="true"></div>
        <img :src="featured.image" :alt="featured.title" class="phone" />
      </div>
      <div class="info">
        <span class="tag">{{ featured.type }}</span>
        <h3 class="font-audiowide text-primary-500 text-3xl md:text-4xl lg:text-5xl">{{ featured.title }}</h3>
        <p class="text-neutral-300 text-sm md:text-base lg:text-lg">{{ featured.description }}</p>
        <div class="flex flex-wrap gap-2.5 pt-3">
          <a :href="featured.link" target="_blank" class="btn btn-primary text-base md:text-lg">View Project ↗</a>
          <a v-if="featured.link2" :href="featured.link2" target="_blank" class="btn btn-ghost text-base md:text-lg">GitHub ↗</a>
        </div>
      </div>
    </article>

    <!-- Project grid -->
    <section id="project-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <article v-for="project in others" :key="project.title"
        class="group bg-neutral-800 rounded-3xl overflow-hidden flex flex-col">
        <div class="overflow-hidden">
          <img :src="project.image" :alt="project.title" class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.04] !rounded-none" />
        </div>
        <div class="flex flex-col gap-2 p-5 md:p-6 flex-1">
          <span class="tag">{{ project.type }}</span>
          <h3 class="font-audiowide text-primary-500  text-xl md:text-2xl lg:text-3xl">{{ project.title }}</h3>
          <p class="text-neutral-300 text-sm leading-relaxed line-clamp-3">{{ project.description }}</p>
          <div class="mt-auto flex flex-wrap gap-2 pt-4">
            <a :href="project.link" target="_blank" class="btn btn-primary text-sm">View Project ↗</a>
            <a v-if="project.link2" :href="project.link2" target="_blank" class="btn btn-ghost text-sm">GitHub ↗</a>
          </div>
        </div>
      </article>
    </section>

    <!-- Keep in touch -->
    <div
      class="hightlight-border bg-neutral-800 rounded-3xl md:rounded-4xl p-8 md:p-12 flex flex-col items-center gap-6 text-center">
      <a href="#contact" class="no-underline">
        <h3 class="font-audiowide text-primary-500 text-4xl md:text-5xl lg:text-6xl">Keep In Touch!</h3>
      </a>
      <div class="flex flex-row gap-4">
        <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank" class="icon-container bg-blue-500">
          <svg class="icon text-white" alt="LinkedIn"><use xlink:href="#linkedin" /></svg>
        </a>
        <a href="https://github.com/Justin26l/" target="_blank" class="icon-container bg-neutral-900">
          <svg class="icon text-white" alt="Github"><use xlink:href="#github" /></svg>
        </a>
        <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank" class="icon-container bg-orange-600">
          <svg class="icon text-white" alt="Gitbook"><use xlink:href="#gitbook" /></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    title: 'Spents mobile app',
    type: 'Fullstack Application Development',
    myRole: 'Tech Research, Mobile & Cross Platform Dev, Backend Dev, UI UX Designer',
    description: 'Spents is a personal ledger app. This a POC of Offline-First architecture and practice of my UI/UX design skill.',
    link: 'https://www.figma.com/proto/10eFNWDmh8LXMNzGLG0DL2/Spents?node-id=35120-46175&p=f&t=6G6plvh3j3SlMfFa-1&scaling=scale-down&content-scaling=fixed&page-id=16537%3A45869&starting-point-node-id=35120%3A46175',
    image: 'img/spentsMobile.png',
  },
  {
    title: 'xxxTerminal.com',
    type: 'Trading-bot solution SAAS',
    myRole: 'Product Owner, Software Engineer, Marketer',
    description: 'this is a platform that provide algo trading solutions. let trader run trading bots in ease, reduce software skill requirement for traders.',
    link: '/sites/xxxterminal/home.html',
    image: 'img/xxxTerminal.png',
  },
  {
    title: 'VeryExpress',
    type: 'Code Generator, Development Tool',
    myRole: 'Product Owner, Software Engineer,',
    description: 'A Open-source generator to make Express.js app with custom REST API defined in Json Schema and Open Api',
    link: 'https://github.com/Justin26l/VeryExpress',
    link2: 'https://www.npmjs.com/package/very-express',
    image: 'img/vex.png',
  },
  {
    title: 'LightweightPOS',
    type: 'Offline-First POS & Inventory System',
    myRole: 'Product Owner, Software Engineer, UI/UX Designer',
    description: 'A zero-backend, offline-first POS & inventory system. Recipe-driven stock control computes availability & cost from material stock. Built with Vue3, Tailwind CSS and IndexedDB as a PWA.',
    link: 'https://pos.xxxterminal.com/#/pos',
    link2: 'https://github.com/Justin26l/LightweightPOS',
    image: 'img/lightweightPos.png',
  },
];

const featured = projects[0];
const others = projects.slice(1);
</script>

<style scoped>
@reference "../assets/css/style.css";

.featured-card {
  @apply grid md:grid-cols-2 bg-neutral-800 rounded-3xl md:rounded-[2rem] overflow-hidden;
}

.featured-card .media {
  @apply relative flex items-center justify-center bg-neutral-900 overflow-hidden py-10 md:py-0 md:order-2;
}

.featured-card .glow {
  @apply absolute inset-0 pointer-events-none;
  background: radial-gradient(80% 65% at 50% 45%, rgba(162, 242, 3, 0.10), transparent 70%);
}

.featured-card .phone {
  @apply relative z-10 h-72 md:h-[26rem] lg:h-[30rem] w-auto max-w-full object-contain !rounded-2xl;
}

.featured-card .info {
  @apply flex flex-col justify-center gap-3 p-6 md:p-10 lg:p-12;
}

.tag {
  @apply w-fit text-secondary-400 border border-secondary-500/40 text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider;
}

.hightlight-border {
  @apply border-3 md:border-4 border-primary-500;
}

.btn-ghost {
  @apply bg-transparent border border-neutral-600 text-neutral-200 transition-colors;
  @apply hover:border-primary-500 hover:text-primary-500;
}
</style>
