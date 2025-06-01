<template>
  <div class="push-center flex flex-row justify-center">
    <!-- Left Pane -->
    <div class="flex-shrink-0 bg-theme pe-2 lg:pe-4">
      <p class="year-title">20</p>
    </div>
    <!-- Right Pane -->
    <div class="flex-grow text-xl">
      <div>
        <p class="year-title bg-theme">21</p>
        <p>Start <b>Crypto trading</b> in pendemic, <br />
          Learn <a class="link" target="_blank"
            href="https://www.tradingview.com/pine-script-docs/welcome/">PineScript</a> & technical analysis and
          start freelancing on <a class="link" target="_blank" href="https://www.fiverr.com/justin26l">fiverr</a> as
          trading stetegy & algo bot developer.</p>
      </div>
      <div>
        <p class="year-title bg-theme">22</p>
        <p>start building xxxTerminal, <br />it is a Platform as a service (PaaS) to reduce the workload from my
          freelance jobs,
          it let trader setup their trading strategy without need of developer setup environment everytime, kinda
          like wrodpress of trading bot.
          <br />
          <br /> realise im lack of technical skills such as cyber security, load balancing & scaling, <br /> so i
          enrol a diploma programe specificly for web development at i-tea technology, a software house in malaysia.
          <br />
        </p>
      </div>
      <div>
        <p class="year-title bg-theme">23</p>
        <p>join simit group as a full-stack engineer, <br /> re-build simtrian portal app, <br /> develop simbiz crm
        </p>
      </div>
      <div>
        <p class="year-title bg-theme">24</p>
        <p>build open source project "very express" <br /> develop simit e-invoice, <br /> enrol UX design course
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "./../assets/css/tailwind.css";
.year-title {
  @apply text-5xl py-2 sticky top-0 border-b;
  @apply lg:text-8xl lg:py-4;
}
</style>