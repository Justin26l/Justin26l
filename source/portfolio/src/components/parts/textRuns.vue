<template>
  <template v-for="(run, i) in runs" :key="i">
    <a v-if="run.l" :href="run.href" target="_blank" class="light link">{{ run.l }}</a>
    <b v-else-if="run.b" class="text-amber-400">{{ run.b }}</b>
    <span v-else>{{ run.t }}</span>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  runs: { t?: string; l?: string; b?: string; href?: string }[];
}>();
</script>
