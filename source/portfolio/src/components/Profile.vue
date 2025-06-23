<template>

  <div class="flex flex-col md:flex-row justify-center items-center w-vw h-svh gap-4 lg:gap-8 text-white">

    <div class="flex overflow-clip rounded-xl shadow-xl bg-neutral-100">
      <img src="/img/profilePic.png" alt="Justin Lai" class="relative z-30 w-[60vw] md:w-[30vw]" />
    </div>

    <div class="flex flex-col gap-2 overflow-clip">

      <p class="heading-lg text-primary-500 my-4 opacity-0 flow-in">Justin Lai</p>
      <div class="heading ps-8">
        <p class="my-4 opacity-0 flow-in ani-delay-500">Fullstack Web Developer</p>
        <p class="my-4 opacity-0 flow-in ani-delay-800">Frontend Engineer</p>
        <p class="my-4 opacity-0 flow-in ani-delay-1100">UI & UX Designer </p>
      </div>

      <div class="flex flex-col px-2 gap-2 opacity-0 flow-in ani-delay-1500">

        <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank" class="button-sns bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="w-6 h-6 text-white">
            <use xlink:href="#linkedin" />
          </svg>
          Justin Lai
        </a>

        <a href="https://github.com/Justin26l/" target="_blank" class="button-sns bg-neutral-900 dark:bg-neutral-100 ">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="w-6 h-6 text-white dark:text-black">
            <use xlink:href="#github" />
          </svg>
          Justin26l
        </a>

        <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank" class="button-sns bg-orange-600 ">
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
@reference "../assets/css/style.css";

.button-sns {
  @apply gap-2 flex justify-center w-[16rem] px-4 py-2 rounded-md !text-white no-underline;
}

.heading {
  @apply text-3xl md:text-4xl lg:text-5xl font-bold;
}

.heading-lg {
  @apply text-5xl md:text-7xl lg:text-8xl font-bold;
}
</style>