<template>

<div class="my-6 w-full">
  <div class="grid grid-cols-3 2xl:grid-cols-5 gap-4 px-2">
    <div class="flex items-end col-span-1 2xl:col-span-2 relative rounded-md bg-invert overflow-clip">
      <img src="/img/profilePic.png" alt="Justin Lai" class="relative z-30 w-full" />
    </div>

    <div class="col-span-2 2xl:col-span-3 flex flex-col gap-4 overflow-clip">
      
      <h1 class="heading-lg opacity-0 flow-in">Justin Lai</h1>
      <h1 class="heading opacity-0 flow-in ani-delay-500">Fullstack Web Developer</h1>
      <h1 class="heading opacity-0 flow-in ani-delay-1000">Frontend Engineer</h1>

      <div class="flex flex-col px-2 gap-2 opacity-0 flow-in ani-delay-1500">

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
  </div>
</template>

<style scoped>
@reference "../assets/css/style.css";
.button-sns{
  @apply gap-2 flex justify-center w-[16rem] px-4 py-2 rounded-md !text-white no-underline;
}

.heading{
  @apply text-4xl lg:text-5xl xl:text-6xl font-extrabold text-left my-4;
}

.heading-lg{
  @apply text-6xl lg:text-7xl xl:text-8xl font-extrabold text-left my-4;
}
</style>