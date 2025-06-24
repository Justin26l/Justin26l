<template>

  <div class="flex flex-col md:flex-row justify-center items-center w-vw h-svh gap-4 lg:gap-8 text-white">

    <div class="flex overflow-clip rounded-xl shadow-xl bg-neutral-100">
      <img src="/img/profilePic.png" alt="Justin Lai" class="relative z-30 w-[60vw] md:w-[30vw]" />
    </div>

    <div class="flex flex-col gap-2 overflow-clip">

      <p class="heading-lg font-audiowide text-primary-500 my-4 opacity-0 flow-up">Justin Lai</p>
      <div class="heading ps-8 pb-6">
        <p class="my-4 opacity-0 flow-up ani-delay-500">Fullstack Web Developer</p>
        <p class="my-4 opacity-0 flow-up ani-delay-800">Frontend Engineer</p>
        <p class="my-4 opacity-0 flow-up ani-delay-1100">UI & UX Designer </p>
      </div>

      <div class="ps-8 flex flex-row gap-4">

        <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank" class="icon-container z-30 opacity-0 flow-in ani-delay-1500 bg-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="icon text-white">
            <use xlink:href="#linkedin" />
          </svg>
        </a>

        <a href="https://github.com/Justin26l/" target="_blank" class="icon-container z-20 opacity-0 flow-in ani-delay-1600 bg-neutral-900">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="icon text-white">
            <use xlink:href="#github" />
          </svg>
        </a>

        <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank" class="icon-container z-10 opacity-0 flow-in ani-delay-1700 bg-orange-600 ">
          <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="icon text-white">
            <use xlink:href="#gitbook" />
          </svg>
        </a>

      </div>
    </div>

  </div>
</template>