<template>
  <div class="grid grid-cols-2 2xl:grid-cols-5 gap-4 px-2">
    <div class="flex items-end col-span-2 sm:col-span-1 2xl:col-span-2 relative rounded-md bg-invert overflow-clip">
      <img src="/img/profilePic.png" alt="Justin Lai" class="relative z-30 w-full" />
    </div>

    <div class="col-span-2 sm:col-span-1 2xl:col-span-3 flex flex-col gap-4 overflow-clip">
      <h1 class="my-3 text-6xl lg:text-7xl xl:text-8xl font-extrabold">Justin Lai</h1>
      <div class="ps-2">
        <h2 class="mt-0 mb-2">
          <svg class="w-5 h-5 text-main">
            <use xlink:href="#round2" />
          </svg>
          Front-end Software engineer
        </h2>
        <h2 class="mt-0 mb-2">
          <svg class="w-5 h-5 text-main">
            <use xlink:href="#round2" />
          </svg>
          Back-end Software engineer
        </h2>
        <h2 class="mt-0 mb-2">
          <svg class="w-5 h-5 text-main">
            <use xlink:href="#round2" />
          </svg>
          UX Designer
        </h2>
      </div>

      <div class="grid grid-cols-2 px-2 gap-2">
        <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank"
          class="button-sns bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="w-6 h-6 text-white">
            <use xlink:href="#linkedin" />
          </svg>
          Justin Lai
        </a>
        <a href="https://github.com/Justin26l/" target="_blank"
          class="button-sns bg-neutral-900 dark:bg-neutral-100 ">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="w-6 h-6 text-white dark:text-black">
            <use xlink:href="#github" />
          </svg>
          Justin26l
        </a>
        <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank"
          class="button-sns bg-orange-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="w-6 h-6 text-white">
            <use xlink:href="#gitbook" />
          </svg>
          Git Book
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>
@reference "../assets/css/tailwind.css";
.button-sns{
  @apply gap-2 flex items-center px-4 py-2 rounded-md !text-white no-underline;
}
</style>