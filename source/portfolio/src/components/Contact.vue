<template>
  <div class="push-center">
    <div class="bg-white dark:bg-black border overflow-hidden rounded-md">
      <div class="flex flex-col items-center gap-4 w-full">
        <div class="flex justify-end w-full md:pe-12">
          <img src="./../assets/svg/contact-hand-up.svg" alt="contact vector"
            class="w-1/2 md:w-1/3 lg:w-1/4 h-full -rotate-30" />
        </div>
        <h2 class="font-audiowide text-4xl text-center mb-4">Get in touch with me !</h2>
        <div class="flex flex-col md:flex-row px-2 justify-center gap-4">
          <a href="https://www.linkedin.com/in/justin-lai-3b859422a/" target="_blank"
            class="bg-blue-500 flex justify-center gap-2 px-4 py-2 rounded-md !text-white no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" alt="LinkedIn" class="w-6 h-6 text-white">
              <use xlink:href="#linkedin" />
            </svg>
            Justin Lai
          </a>
          <a href="https://github.com/Justin26l/" target="_blank"
            class="bg-neutral-900 dark:bg-neutral-100 flex justify-center gap-2 px-4 py-2 rounded-md !text-white no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" alt="Github" class="w-6 h-6 text-white dark:text-black">
              <use xlink:href="#github" />
            </svg>
            Justin26l
          </a>
          <a href="https://justin-se.gitbook.io/justin-se-docs" target="_blank"
            class="bg-orange-600 flex justify-center gap-2 px-4 py-2 rounded-md !text-white no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" alt="Gitbook" class="w-6 h-6 text-white">
              <use xlink:href="#gitbook" />
            </svg>
            Git Book
          </a>
        </div>
        <div class="flex justify-start w-full md:ps-12">
          <img src="./../assets/svg/contact-hand-down.svg" alt="contact vector"
            class="w-1/2 md:w-1/3 lg:w-1/4 h-full -rotate-30" />
        </div>

      </div>
    </div>
  </div>
</template>
