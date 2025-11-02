<template>
  <div class="relative inline-block overflow-hidden">
    <!-- Animated block -->
    <div
      class="absolute inset-0 bg-primary-500 z-20 origin-right transition-transform duration-700"
      :class="{'scale-x-0': revealed}"
      :style="{ transitionDelay: (0.2 * props.delay) + 's' }"
    ></div>
    <!-- Text (revealed as block shrinks) -->
    <span class="relative z-10 text-white transition-colors duration-700">
      {{ props.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const props = defineProps<{ 
  text: string,
  delay?: number 
}>()
const revealed = ref(false)
onMounted(() => {
  setTimeout(() => {
    revealed.value = true
  }, 50)
})
</script>