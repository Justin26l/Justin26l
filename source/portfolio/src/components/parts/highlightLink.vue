<template>
    <a class="link light !no-underline hover:!underline" target="_blank" :href="props.href">
        <slot></slot>
    </a>
</template>

<script setup lang="ts">
const props = defineProps<{ 
    href: string 
}>();
</script>
