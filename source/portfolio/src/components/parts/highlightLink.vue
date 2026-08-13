<template>
    <a class="light link" target="_blank" :href="props.href">
        <slot></slot>
    </a>
</template>

<script setup lang="ts">
const props = defineProps<{ 
    href: string 
}>();
</script>
