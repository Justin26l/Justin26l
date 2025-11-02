<template>
  <div class="group relative">
    <span
      v-for="(letter, index) in letters"
      :key="index"
      class="inline-block overflow-hidden align-bottom"
      :class="props.height"
    >
      <span
        class="flex flex-col transition-transform duration-300"
        :style="`transition-delay: ${index * 15}ms;`"
        :class="{
          'group-hover:translate-y-[-50%]': true
        }"
      >
        <span
          class="transition-opacity duration-300"
          :style="`transition-delay: ${index * 15}ms;`"
          :class="{'opacity-100': true, 'group-hover:opacity-0': true}"
        >{{ letter }}</span>
        <span
          class="text-primary-300 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          :style="`transition-delay: ${index * 15}ms;`"
        >{{ letter }}</span>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  height?: string;
}>();
const letters = props.text.split("").map(l => l === " " ? "\u00A0" : l);
</script>