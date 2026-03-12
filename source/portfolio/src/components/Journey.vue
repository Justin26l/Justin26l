<template>
  <div class="bg-neutral-800 w-full pb-20">
    <div class="push-center flex flex-col justify-center">
      <h1 class="heading-lg heading-padding font-audiowide text-primary-500 bg-part-black">Journey</h1>

      <div class="w-full flex flex-row justify-center text-neutral-200">
        <!-- Left Pane -->
        <div class="flex-shrink-0 pe-2 lg:pe-4">
          <p class="year-title font-audiowide">20</p>
        </div>
        <!-- Right Pane -->
        <div class="text-xl">
          <div class="year-container">
            <p class="year-title font-audiowide">21</p>
            <BulletItem>Fulltime Stock Trading in pandemic</BulletItem>
            <BulletItem>Make Trading Bots with <a class="link light" target="_blank" href="https://www.tradingview.com/pine-script-docs/welcome/">PineScript</a></BulletItem>
            <BulletItem>Freelancing on <a class="link light" target="_blank" href="https://www.fiverr.com/justin26l">Fiverr</a>, provide trading bot service</BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title font-audiowide">22</p>
            <BulletItem>Start building <a class="link light" target="_blank" href="/sites/xxxterminal/home.html">xxxTerminal</a>, a Saas to automate freelance work.</BulletItem>
            <BulletItem>Realise me lack of profesional skill in software development, learn systematicly at <a class="link light" target="_blank" href="https://i-tea.com.my/en">i-tea technology</a></BulletItem>
            <BulletItem :level="1">Certified by <b>Lincoln University Collage</b> <a class="link light" target="_blank" href="https://drive.google.com/file/d/1tuVwTyzcEiVozW4BbA487OO3PNnXovA2/view?usp=sharing">Diploma in Web Programming</a></BulletItem>
            <BulletItem :level="1">Certified by <b>UTM Space</b> <a class="link light" target="_blank" href="https://drive.google.com/file/d/1ZlPTwid14rMYFLgbNlI9CEXl9DY6t14D/view?usp=sharing">Professional Certificate in Web Programming</a>
            </BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title font-audiowide">23</p>
            <BulletItem>Start working on february at <a class="link light" target="_blank" href="https://simitgroup.com/">SIMIT Group</a> as <b>Software Engineer</b></BulletItem>
            <BulletItem :level="1">Maintaining <b>Simbiz & Simtrain ERP</b>, features & stability</BulletItem>
            <BulletItem :level="1">Rebuild <b>Simtrian Portal</b> mobile app</BulletItem>
            <BulletItem :level="1">Develop new system <b>Simbiz CRM</b></BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title font-audiowide">24</p>
            <BulletItem>Develop Open-Source Project <a class="link light" target="_blank" href="https://github.com/Justin26l/VeryExpress">Very-Express</a>, a application generator / development tool</BulletItem>
            <BulletItem>Certified by <b>Google Career</b> <a class="link light" target="_blank" href="https://drive.google.com/file/d/1iBTnXq9UQvQpk43OCPqZ-ly5S8fybnE7/view?usp=sharing">Google UX Design</a></BulletItem>
            <BulletItem>Meanwhile in SIMIT Group</BulletItem>
            <BulletItem :level="1">Development of <b>E-invoicing Service</b>, enable high-volume submission to LHDN (Malaysia tax authority) database.</BulletItem>
          </div>
          <div class="year-container">
            <p class="year-title font-audiowide">25</p>
            <BulletItem>Develop mobile app <b>Spents</b> as Proof-of-Concept of below topics :</BulletItem>
            <BulletItem :level="1"><b>Offline First Local DB</b> & <b>Offline DB cloud backup</b></BulletItem>
            <BulletItem :level="1"><b>Very-Express</b> in production</BulletItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BulletItem from './animated/bulletItem.vue';
</script>

<style scoped>
@reference "./../assets/css/style.css";

b{
  @apply text-amber-400;
}

.year-title{
  z-index: 1;
  @apply text-neutral-50 bg-neutral-800 text-5xl my-0 py-2 sticky top-0 border-b ;
  @apply lg:text-8xl lg:py-4;
}

.year-container{
  @apply pb-8;
}
</style>