<!--
  THESIS      A dark "talk to me" band between the hero and the project grid that invites a visitor to
              stop reading about Justin and interview his digital clone instead. It refuses the
              portfolio default where the only action is "scroll more".
  OWN-WORLD   The committed dark world: neutral-900 ground, a lime (primary-500) 4px-bordered card,
              Audiowide display in lime, body in CharlesWrightBold, and one authored motion — the
              pulsing lime "online" dot.
  STORY       Recruiters/clients learn that this site is backed by an AI that answers as Justin from
              his real data, and that they can open it and ask anything right now.
  FIRST VIEW  A live status pill over a wide Audiowide headline, then a bordered "chat" card whose
              composer strip is the real action: it opens the live clone in a new tab.
  FORM        A full-width statement (the site's header idiom) followed by a split row: grounded copy
              + CTA on the left, the bordered conversation card on the right.
-->
<template>
  <div class="push-center flex flex-col py-20 md:py-28 gap-10 lg:gap-14">

    <!-- Header statement -->
    <div class="flex flex-col items-start gap-5 max-w-4xl">
      <span
        class="inline-flex items-center gap-2.5 rounded-full border border-primary-500/50 text-primary-400 px-3.5 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em]">
        <span class="h-2 w-2 rounded-full bg-primary-500 animate-pulse" aria-hidden="true"></span>
        Digital clone · Live
      </span>

      <h2 class="font-audiowide text-primary-500 text-5xl md:text-6xl xl:text-7xl leading-[1.04] m-0">
        Meet my digital clone.
      </h2>
    </div>

    <!-- Copy + conversation card -->
    <div class="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

      <!-- Copy -->
      <div class="flex flex-col items-start gap-6 lg:w-[40%]">
        <p class="text-neutral-200 text-base md:text-lg leading-relaxed max-w-[52ch] m-0">
          An AI that <span class="text-white">answers as me</span> — grounded strictly in my real
          profile and projects, with citations after every reply. No invented experience, no filler:
          interview me instead of scrolling.
        </p>

        <a href="https://digiclone.xxxterminal.com/" target="_blank" rel="noopener"
          class="btn btn-primary text-lg md:text-xl px-6 py-3">
          Start a conversation ↗
        </a>
        <p class="text-neutral-500 text-sm leading-relaxed max-w-[46ch] m-0">
          Run it your way — on-device GPU (WebGPU), your own API key, or my cloud. No sign-up.
        </p>
      </div>

      <!-- Conversation card (real CTA: opens the live clone) -->
      <div class="relative lg:w-[60%]">
        <div class="absolute -inset-3 sm:-inset-6 lg:-inset-10 glow rounded-3xl pointer-events-none" aria-hidden="true"></div>

        <div class="relative rounded-2xl border-4 border-primary-500 bg-neutral-800 overflow-hidden flex flex-col">
          <!-- window chrome -->
          <div class="flex flex-row items-center justify-between gap-3 px-5 md:px-7 py-3.5 border-b border-white/10">
            <div class="flex flex-row items-center gap-2.5 min-w-0">
              <span class="h-3 w-3 rounded-[2px] bg-secondary-500 shrink-0" aria-hidden="true"></span>
              <span class="text-neutral-300 text-xs font-bold uppercase tracking-wider truncate">
                Justin · AI clone
              </span>
            </div>
            <span class="inline-flex items-center gap-1.5 text-primary-400 text-xs font-bold uppercase tracking-wider shrink-0">
              <span class="h-2 w-2 rounded-full bg-primary-500 animate-pulse" aria-hidden="true"></span>
              Online
            </span>
          </div>

          <!-- conversation preview -->
          <div class="px-5 md:px-7 py-7 md:py-9 flex flex-col gap-5 md:gap-6">
            <div class="flex flex-col gap-3 max-w-[88%]">
              <p class="bg-neutral-700/60 rounded-2xl rounded-tl-sm px-4 md:px-5 py-3 md:py-4 text-neutral-50 text-sm md:text-base leading-relaxed m-0">
                Hi — I'm Justin's digital clone. Ask me about any project, how I think,
                or what I could build for you.
              </p>
              <div class="flex flex-row gap-1.5 ps-1" aria-hidden="true">
                <span class="h-1.5 w-1.5 rounded-full bg-neutral-500"></span>
                <span class="h-1.5 w-1.5 rounded-full bg-neutral-500"></span>
                <span class="h-1.5 w-1.5 rounded-full bg-neutral-500"></span>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-neutral-500 text-[11px] md:text-xs font-bold uppercase tracking-wider m-0">
                Try asking
              </p>
              <div class="flex flex-wrap gap-2.5">
                <a v-for="q in starters" :key="q" :href="dcUrl" target="_blank" rel="noopener"
                  :aria-label="'Ask the clone: ' + q"
                  class="rounded-full border border-neutral-600 px-4 py-2 text-neutral-200 text-sm leading-snug transition-colors hover:border-primary-500 hover:text-primary-400">
                  {{ q }}
                </a>
              </div>
            </div>
          </div>

          <!-- composer strip = the real action -->
          <a :href="dcUrl" target="_blank" rel="noopener"
            class="group mt-auto flex flex-row items-center justify-between gap-3 border-t border-white/10 px-5 md:px-7 py-4 md:py-5 transition-colors hover:bg-neutral-700/20"
            aria-label="Open the live Digital Clone chat in a new tab">
            <span class="text-neutral-400 text-sm md:text-base">Ask me anything…</span>
            <span
              class="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-primary-500 text-black text-lg font-bold transition-transform duration-200 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>

        <p class="pt-4 text-center text-neutral-500 text-xs m-0">
          Live preview — the real conversation opens in a new tab, where you pick the engine.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const dcUrl = 'https://digiclone.xxxterminal.com/';
const starters = [
  'What have you built?',
  'What was your hardest technical problem?',
  'How do you work with a team?',
];
</script>

<style scoped>
.glow {
  background: radial-gradient(60% 60% at 50% 45%, rgba(162, 242, 3, 0.10), transparent 70%);
}
</style>
