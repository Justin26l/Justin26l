<template>
  <h1 class="flex flex-row gap-4 w-full overflow-clip bg-black text-6xl lg:text-8xl m-0 py-4"
    style="white-space: nowrap">
    <span class="text-main">{{ props.value }}</span>
    <span class="text-neutral-400">{{ props.value }}</span>
    <span class="text-main">{{ props.value }}</span>
    <span class="text-neutral-400">{{ props.value }}</span>
    <span class="text-main">{{ props.value }}</span>
    <span class="text-neutral-400">{{ props.value }}</span>
    <span class="text-main">{{ props.value }}</span>
    <span class="text-neutral-400">{{ props.value }}</span>
    <span class="text-main">{{ props.value }}</span>
    <span class="text-neutral-400">{{ props.value }}</span>
  </h1>
</template>
<script setup lang="ts">  
const props = defineProps<{
  value: string
}>()
</script>