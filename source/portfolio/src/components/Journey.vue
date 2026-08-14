<template>
  <div class="bg-neutral-800 w-full pb-20">
    <div class="push-center flex flex-col justify-center">
      <h1 class="heading-lg heading-padding font-audiowide text-primary-500 bg-part-black">Journey</h1>

      <!-- Achievement navigation (scrollspy) -->
      <nav ref="navRef" aria-label="Achievements"
        class="sticky top-0 z-40 bg-neutral-800 border-y border-neutral-700/60 -mx-4 px-4 lg:mx-0 lg:px-0 py-2.5 my-6 md:my-8 overflow-x-auto no-scrollbar">
        <div class="flex flex-row items-center gap-2 w-max">
          <template v-for="(doc, i) in allDocs" :key="doc.id">
            <p :data-target="doc.id" @click="goTo(doc.id)"
              :class="[
                'font-bold transition-colors duration-200 cursor-pointer select-none',
                activeId === doc.id
                  ? 'text-primary-500'
                  : 'text-neutral-300 hover:text-primary-500',
              ]">
              {{ doc.label }}
            </p>
            <p v-if="i < allDocs.length - 1" class="text-neutral-500"> | </p>
          </template>
        </div>
      </nav>

      <!-- Achievement documents grouped by year -->
      <div v-for="group in years" :key="group.year" class="year-group">
        <div class="flex flex-row items-center gap-4 pb-3 pt-16 first:mt-0">
          <span class="font-audiowide text-white text-4xl md:text-5xl lg:text-6xl leading-none">{{ group.year }}</span>
          <span class="h-px flex-1 bg-neutral-700/70" aria-hidden="true"></span>
        </div>

        <!-- Year summary -->
        <div class="ps-6 md:ps-12 lg:ps-16 mb-6 md:mb-8">
          <p class="text-primary-500 text-base md:text-xl m-0 py-2">{{ group.episode }}</p>
          <p class="text-sm md:text-base text-neutral-200 m-0">{{ group.summary }}</p>
        </div>

        <div class="flex flex-col ps-6 md:ps-12 lg:ps-16">
          <div v-for="doc in group.docs" :id="doc.id" :key="doc.id"
            class="achievement-doc scroll-mt-24 py-2 md:py-3 lg:py-4 border-b border-neutral-700/40 last:border-b-0">
            <span v-if="doc.context"
              class="block text-primary-400 text-xs font-bold mb-1.5 ps-[26px] md:ps-8">{{ doc.context }}</span>
            <div class="flex flex-row items-center gap-3 md:gap-4 py-2">
              <span class="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 rounded bg-secondary-500" aria-hidden="true"></span>
              <h3 class="flex-1 min-w-0 text-neutral-50 text-lg md:text-xl m-0">
                <TextRuns :runs="doc.title" />
              </h3>
            </div>
            <div v-if="doc.details"
              class="ps-[26px] md:ps-8 mt-1.5 flex flex-col gap-y-1.5 text-sm md:text-base text-neutral-300 leading-relaxed">
              <div v-for="(detail, di) in doc.details" :key="di" class="flex flex-row items-start gap-2.5 md:gap-3">
                <span class="mt-[0.5em] h-2 w-2 shrink-0 rounded-[2px] bg-white" aria-hidden="true"></span>
                <p class="m-0"><TextRuns :runs="detail" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import TextRuns from './parts/textRuns.vue';

type Run = { t?: string; l?: string; b?: string; href?: string };

type YearGroup = {
  year: number;
  episode: string;
  summary: string;
  docs: { id: string; label: string; context?: string; title: Run[]; details?: Run[][] }[];
};

const years: YearGroup[] = [
  {
    year: 2021,
    episode: 'Starting Point: Algorithmic Trading Developer',
    summary: 'Went full-time into algorithmic trading after the pandemic, then turned it into a freelance career.',
    docs: [
      { id: '2021-bots', label: 'Trading Bots', title: [{ t: 'Fulltime stock trading and build own trading bots.' }] },
      { 
        id: '2021-freelance', 
        label: 'Freelance Developer', 
        title: [{ t: 'Freelance trading systems developer.' }],
        details: [
          [{ t: 'Trading strategy consultation '}],
          [{ t: 'Automate trading bot development services '}]
        ]
      },
    ],
  },
  {
    year: 2022,
    episode: 'Found the Skill Gap, Went Back to Fundamentals',
    summary: 'Built a SaaS product, then realized the fundamentals of software engineering were missing — and went to fix that.',
    docs: [
      { id: '2022-terminal', label: 'xxxTerminal', title: [{ t: 'Built ' }, { l: 'xxxTerminal', href: '/sites/xxxterminal/home.html' }, { t: ', a SaaS platform for trading automation and a skill-sharing community.' }] },
      {
        id: '2022-itea',
        label: 'i-Tea & Certificates',
        title: [{ t: 'Enrolled at ' }, { l: 'i-Tea Technology', href: 'https://i-tea.com.my/en' }, { t: ' to build a systematic engineering foundation:' }],
        details: [
          [{ l: 'Diploma in Web Programming', href: 'https://drive.google.com/file/d/1tuVwTyzcEiVozW4BbA487OO3PNnXovA2/view?usp=sharing' }, { t: ' (awarded by Lincoln University College)' }],
          [{ l: 'Professional Certificate in Web Programming', href: 'https://drive.google.com/file/d/1ZlPTwid14rMYFLgbNlI9CEXl9DY6t14D/view?usp=sharing' }, { t: ' (awarded by UTM Space)' }],
        ],
      },
    ],
  },
  {
    year: 2023,
    episode: 'Joined SIM IT, Entered Enterprise-Scale Development',
    summary: 'Started as a Software Engineer, working across ERP features, legacy stabilization, and new product development.',
    docs: [
      {
        id: '2023-simit',
        label: 'SIM IT',
        title: [{ t: 'Joined ' }, { l: 'SIM IT Sdn Bhd', href: 'https://simitgroup.com/' }, { t: ' as Software Engineer.' }],
        details: [
          [{ t: 'Developed features for ' }, { l: 'Simbiz', href: 'https://www.onlinesimbiz.com/' }, { t: ' Accounting ERP.' }],
          [{ t: 'Stabilized and patched the legacy ' }, { l: 'Simtrain5', href: 'https://simtrainsystem.com/' }, { t: ' system.' }],
          [{ t: 'Rebuilt the ' }, { l: 'Simtrain Portal', href: 'https://play.google.com/store/apps/details?id=com.simitgroup.binajaya' }, { t: ' mobile app.' }],
          [{ t: 'Researched and developed a new system, ' }, { b: 'Simbiz CRM' }, { t: '.' }],
        ],
      },
    ],
  },
  {
    year: 2024,
    episode: 'Open Source, UX Certification, and Enterprise-Scale Delivery',
    summary: 'The busiest year: shipped an open-source project, earned a UX credential, and led a high-availability enterprise system.',
    docs: [
      { id: '2024-vex', label: 'VeryExpress', title: [{ t: 'Built ' }, { l: 'VeryExpress', href: 'https://github.com/Justin26l/VeryExpress' }, { t: ', an open-source REST API service generator.' }] },
      { id: '2024-guxd', label: 'Google UX Design', title: [{ t: 'Earned the ' }, { l: 'Google UX Design', href: 'https://drive.google.com/file/d/1iBTnXq9UQvQpk43OCPqZ-ly5S8fybnE7/view?usp=sharing' }, { t: ' Professional Certificate.' }] },
      {
        id: '2024-einvoice',
        label: 'E-Invoice Service',
        context: 'In SIM IT',
        title: [{ t: 'Led development of the ' }, { l: 'E-Invoice Auto Submission Service', href: 'https://simitgroup.com/e-invoice/' }],
        details: [
          [{ t: 'Integrated multiple enterprise systems (SIMBIZ, SimTrain Eco, SimSalon).' }],
          [{ t: 'Enabled automated submission to Malaysia\'s tax authority (' }, { l: 'LHDN', href: 'https://www.hasil.gov.my/en/e-invois/pelaksanaan-e-invois-di-malaysia/mengenai-e-invois-manfaatnya/' }, { t: ').' }],
          [{ t: 'Designed for high availability at enterprise scale.' }],
        ],
      },
    ],
  },
  {
    year: 2025,
    episode: 'Validating the Stack, Expanding UX Leadership',
    summary: 'Used a personal project to prove out architecture decisions, while taking on broader UX ownership at work.',
    docs: [
      {
        id: '2025-spents',
        label: 'Spents POC',
        title: [{ t: 'Built ' }, { b: 'Spents' }, { t: ', a mobile app serving as a proof-of-concept for:' }],
        details: [
          [{ t: 'Offline-first local database with cloud backup sync.' }],
          [{ l: 'VeryExpress', href: 'https://github.com/Justin26l/VeryExpress' }, { t: ' running in a real production context.' }],
        ],
      },
      {
        id: '2025-mcplus',
        label: 'MCPlus',
        context: 'In SIM IT',
        title: [{ t: 'Led UX design of ' }, { l: 'MCPLUS App', href: 'https://play.google.com/store/apps/details?id=my.mcplus.mcplus_mobile_app' }, { t: ' and the management portal for ' }, { b: 'MCPlus' }, { t: ', one of Malaysia\'s largest online education platforms.' }],
      },
    ],
  },
  {
    year: 2026,
    episode: 'Independent Build & Skill Expansion',
    summary: 'Shipped an independent product, expanded into new technical territory, and closed out the SIM IT chapter.',
    docs: [
      { id: '2026-pos', label: 'LightweightPOS', title: [{ t: 'Built ' }, { l: 'LightweightPOS', href: 'https://pos.xxxterminal.com/#/pos' }, { t: ', an offline-first POS and inventory management PWA (in production).' }] },
      { id: '2026-sec', label: 'Security & K8s', title: [{ t: 'Self-studied Cybersecurity and Kubernetes.' }] },
      { id: '2026-left', label: 'Left SIM IT', title: [{ t: 'Left ' }, { l: 'SIM IT', href: 'https://simitgroup.com/' }, { t: ' after 3 years and 8 months (Feb 2023 – Oct 2026).' }] },
    ],
  },
];

const allDocs = computed(() => years.flatMap((g) => g.docs));

const activeId = ref('');
const navRef = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

function centerActivePill() {
  const nav = navRef.value;
  if (!nav || !activeId.value) return;
  const pill = nav.querySelector(`[data-target="${activeId.value}"]`) as HTMLElement | null;
  if (!pill) return;
  const target = pill.offsetLeft - nav.clientWidth / 2 + pill.offsetWidth / 2;
  nav.scrollTo({ left: target, behavior: 'smooth' });
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(() => {
  activeId.value = allDocs.value[0]?.id ?? '';
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.achievement-doc'));
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) {
        const id = visible[0].target.id;
        if (id !== activeId.value) {
          activeId.value = id;
          centerActivePill();
        }
      }
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
  );
  cards.forEach((c) => observer?.observe(c));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
@reference "./../assets/css/style.css";

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
