<template>
    <!-- animated bullet item -->
    <div class="flex flex-row gap-4 items-start my-6 flow-up"
        :class="{
            'ps-8': props.level === 1,
            'ps-16': props.level === 2
        }"
    >
        <span class="rounded-sm mt-1.5" :class="{
            'w-4 h-4 bg-primary-500': !props.level || props.level === 0,
            'w-3 h-3 bg-secondary-500': props.level === 1,
            'w-2 h-2 bg-secondary-300': props.level === 1,
        }"></span>
        <p class="flex-1 my-0"><slot></slot></p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    level?: number;
}>(); 
</script>