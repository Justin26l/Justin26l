<template>
  <div class="bg-neutral-800 w-full pb-20">
    <div class="push-center flex flex-col justify-center">
      <h1 class="heading-lg heading-padding font-audiowide text-primary-500 bg-part-black">Journey</h1>

      <div class="w-full flex flex-row justify-center text-neutral-200">
        <!-- Left "20" rail -->
        <div class="hidden md:block flex-shrink-0 pe-4 lg:pe-6">
          <p class="font-audiowide text-neutral-50 text-7xl lg:text-8xl leading-none">20</p>
        </div>

        <!-- Timeline rail -->
        <div class="relative w-full">
          <div class="absolute left-0 top-3 bottom-8 w-0.5 -translate-x-1/2 bg-neutral-700/80" aria-hidden="true"></div>

          <div class="year-container relative ps-8 md:ps-10">
            <span class="year-dot" aria-hidden="true"></span>
            <p class="year-title"><mobileOnly>20</mobileOnly>21</p>
            <BulletItem>Fulltime Stock Trading in pandemic</BulletItem>
            <BulletItem>Make Trading Bots with <HighlightLink href="https://www.tradingview.com/pine-script-docs/welcome/">PineScript</HighlightLink></BulletItem>
            <BulletItem>Freelancing on <HighlightLink href="https://www.fiverr.com/justin26l">Fiverr</HighlightLink>, provide trading bot development service</BulletItem>
          </div>
          <div class="year-container relative ps-8 md:ps-10">
            <span class="year-dot" aria-hidden="true"></span>
            <p class="year-title"><mobileOnly>20</mobileOnly>22</p>
            <BulletItem>Start building <HighlightLink href="/sites/xxxterminal/home.html">xxxTerminal</HighlightLink>, a Saas provide trading bot services</BulletItem>
            <BulletItem>Realise me lack of profesional software development skill, learn systematicly at <HighlightLink href="https://i-tea.com.my/en">i-tea technology</HighlightLink></BulletItem>
            <BulletItem :level="1"><HighlightLink href="https://drive.google.com/file/d/1tuVwTyzcEiVozW4BbA487OO3PNnXovA2/view?usp=sharing">Diploma</HighlightLink> in Web Programming Certified by <HighlightLink href="https://www.lincoln.edu.my/">Lincoln University Collage</HighlightLink> </BulletItem>
            <BulletItem :level="1"><HighlightLink href="https://drive.google.com/file/d/1ZlPTwid14rMYFLgbNlI9CEXl9DY6t14D/view?usp=sharing">Professional Certificate</HighlightLink> in Web Programming Certified by <HighlightLink href="https://www.utm.my/">UTM Space</HighlightLink></BulletItem>
          </div>
          <div class="year-container relative ps-8 md:ps-10">
            <span class="year-dot" aria-hidden="true"></span>
            <p class="year-title"><mobileOnly>20</mobileOnly>23</p>
            <BulletItem>Start working at <HighlightLink href="https://simitgroup.com/">SIM IT Group</HighlightLink> as Software Engineer (Feb 2023 – Oct 2026)</BulletItem>
            <BulletItem :level="1">Maintaining ERP <HighlightLink href="https://www.onlinesimbiz.com/">Simbiz</HighlightLink> & <HighlightLink href="https://simtrainsystem.com/">Simtrain</HighlightLink>, features development & stability patch</BulletItem>
            <BulletItem :level="1">Rebuild <HighlightLink href="https://play.google.com/store/apps/details?id=com.simitgroup.binajaya">Simtrian Portal</HighlightLink> mobile app</BulletItem>
            <BulletItem :level="1">Develop new system <b>Simbiz CRM</b></BulletItem>
          </div>
          <div class="year-container relative ps-8 md:ps-10">
            <span class="year-dot" aria-hidden="true"></span>
            <p class="year-title"><mobileOnly>20</mobileOnly>24</p>
            <BulletItem>Develop Open-Source Project <HighlightLink href="https://github.com/Justin26l/VeryExpress">Very-Express</HighlightLink>, a api service generator</BulletItem>
            <BulletItem><HighlightLink href="https://drive.google.com/file/d/1iBTnXq9UQvQpk43OCPqZ-ly5S8fybnE7/view?usp=sharing">Google UX Design</HighlightLink> Certified by <HighlightLink href="https://www.skills.google/collections/career-certificates" >Google</HighlightLink></BulletItem>
            <BulletItem>In SIMIT Group</BulletItem>
            <BulletItem :level="1">Development of <HighlightLink href="https://simitgroup.com/e-invoice/">E-invoicing Service</HighlightLink>, enable high volume submission to <HighlightLink href="https://www.hasil.gov.my/en/e-invoice/">Malaysia tax authority</HighlightLink></BulletItem>
          </div>
          <div class="year-container relative ps-8 md:ps-10">
            <span class="year-dot" aria-hidden="true"></span>
            <p class="year-title"><mobileOnly>20</mobileOnly>25</p>
            <BulletItem>Develop mobile app <b>Spents</b> as Proof-of-Concept of :</BulletItem>
            <BulletItem :level="1"><b>Offline First Local DB</b> & <b>Offline DB cloud backup</b></BulletItem>
            <BulletItem :level="1"><HighlightLink href="https://github.com/Justin26l/VeryExpress">Very-Express</HighlightLink> in production</BulletItem>
            <BulletItem>In SIMIT Group</BulletItem>
            <BulletItem :level="1">Develop UX & Web Portal for <HighlightLink href="https://play.google.com/store/apps/details?id=my.mcplus.mcplus_mobile_app">MCPlus education system</HighlightLink></BulletItem>
          </div>
          <div class="year-container relative ps-8 md:ps-10">
            <span class="year-dot" aria-hidden="true"></span>
            <p class="year-title"><mobileOnly>20</mobileOnly>26</p>
            <BulletItem>Develop <HighlightLink href="https://pos.xxxterminal.com/#/pos">LightweightPOS</HighlightLink>, an offline-first POS & inventory PWA</BulletItem>
            <BulletItem>Self-learning <b>Cyber-Security</b> and <b>Kubernetes</b></BulletItem>
            <BulletItem>Left <HighlightLink href="https://simitgroup.com/">SIM IT Group</HighlightLink> after 3 years 8 months</BulletItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BulletItem from './parts/bulletItem.vue';
import HighlightLink from './parts/highlightLink.vue';
</script>

<style scoped>
@reference "./../assets/css/style.css";


mobileOnly {
  @apply md:hidden;
}

b {
  @apply text-amber-400;
}

.year-title {
  z-index: 1;
  font-family: 'audiowide', sans-serif;
  @apply text-neutral-50 text-4xl md:text-5xl lg:text-6xl leading-none my-0 pb-5;
}

.year-container {
  color: rgb(203, 203, 203);
  @apply pb-10 tracking-wide text-neutral-200;
}

.year-dot {
  @apply absolute left-0 top-3 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-primary-500 bg-neutral-800;
}
</style>
