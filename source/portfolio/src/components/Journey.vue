<template>
  <div class="bg-neutral-800 w-full pb-20">
    <div class="push-center flex flex-col justify-center">
      <h1 class="heading-lg heading-padding font-audiowide text-primary-500 bg-part-black">Journey</h1>

      <div class="w-full flex flex-row justify-center text-neutral-200">
        <!-- Left Pane -->
        <div class="hidden md:block flex-shrink-0 pe-2 lg:pe-4">
          <p class="year-title">20</p>
        </div>
        <!-- Right Pane -->
        <div class="text-xl">
          <div class="year-container">
            <p class="year-title"><mobileOnly>20</mobileOnly>21</p>
            <BulletItem>Fulltime Stock Trading in pandemic</BulletItem>
            <BulletItem>Make Trading Bots with <HighlightLink href="https://www.tradingview.com/pine-script-docs/welcome/">PineScript</HighlightLink></BulletItem>
            <BulletItem>Freelancing on <HighlightLink href="https://www.fiverr.com/justin26l">Fiverr</HighlightLink>, provide trading bot development service</BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title"><mobileOnly>20</mobileOnly>22</p>
            <BulletItem>Start building <HighlightLink href="/sites/xxxterminal/home.html">xxxTerminal</HighlightLink>, a Saas provide trading bot services</BulletItem>
            <BulletItem>Realise me lack of profesional software development skill, learn systematicly at <HighlightLink href="https://i-tea.com.my/en">i-tea technology</HighlightLink></BulletItem>
            <BulletItem :level="1"><HighlightLink href="https://drive.google.com/file/d/1tuVwTyzcEiVozW4BbA487OO3PNnXovA2/view?usp=sharing">Diploma in Web Programming</HighlightLink> Certified by <HighlightLink href="https://www.lincoln.edu.my/">Lincoln University Collage</HighlightLink> </BulletItem>
            <BulletItem :level="1"><HighlightLink href="https://drive.google.com/file/d/1ZlPTwid14rMYFLgbNlI9CEXl9DY6t14D/view?usp=sharing">Professional Certificate in Web Programming</HighlightLink> Certified by <HighlightLink href="https://www.utm.my/">UTM Space</HighlightLink></BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title"><mobileOnly>20</mobileOnly>23</p>
            <BulletItem>Start working at <HighlightLink href="https://simitgroup.com/">SIMIT Group</HighlightLink> as Software Engineer</BulletItem>
            <BulletItem :level="1">Maintaining ERP <HighlightLink href="https://www.onlinesimbiz.com/">Simbiz</HighlightLink> & <HighlightLink href="https://simtrainsystem.com/">Simtrain</HighlightLink>, features development & stability patch</BulletItem>
            <BulletItem :level="1">Rebuild <HighlightLink href="https://play.google.com/store/apps/details?id=com.simitgroup.binajaya">Simtrian Portal</HighlightLink> mobile app</BulletItem>
            <BulletItem :level="1">Develop new system <b>Simbiz CRM</b></BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title"><mobileOnly>20</mobileOnly>24</p>
            <BulletItem>Develop Open-Source Project <HighlightLink href="https://github.com/Justin26l/VeryExpress">Very-Express</HighlightLink>, a api service generator</BulletItem>
            <BulletItem><HighlightLink href="https://drive.google.com/file/d/1iBTnXq9UQvQpk43OCPqZ-ly5S8fybnE7/view?usp=sharing">Google UX Design</HighlightLink> Certified by <HighlightLink href="https://www.skills.google/collections/career-certificates" >Google</HighlightLink></BulletItem>
            <BulletItem>In SIMIT Group</BulletItem>
            <BulletItem :level="1">Development of <HighlightLink href="https://simitgroup.com/e-invoice/">E-invoicing Service</HighlightLink>, enable high volume submission to <HighlightLink href="https://www.hasil.gov.my/en/e-invoice/">Malaysia tax authority</HighlightLink></BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title"><mobileOnly>20</mobileOnly>25</p>
            <BulletItem>Develop mobile app <b>Spents</b> as Proof-of-Concept of :</BulletItem>
            <BulletItem :level="1"><b>Offline First Local DB</b> & <b>Offline DB cloud backup</b></BulletItem>
            <BulletItem :level="1"><HighlightLink href="https://github.com/Justin26l/VeryExpress">Very-Express</HighlightLink> in production</BulletItem>
            <BulletItem>In SIMIT Group</BulletItem>
            <BulletItem :level="1">Develop UX & Web Portal for <HighlightLink href="https://play.google.com/store/apps/details?id=my.mcplus.mcplus_mobile_app">MCPlus education system</HighlightLink></BulletItem>
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
  @apply text-neutral-50 bg-neutral-800 text-5xl my-0 pb-2 pt-10 md:!pt-2 sticky top-0 border-b ;
  @apply lg:text-8xl lg:py-4;
}

.year-container {
  @apply pb-8 tracking-wide;
}
</style>