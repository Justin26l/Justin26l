<template>
  <div
    class="bullet-item relative flow-up"
    :style="{ animationDelay: delay + 'ms' }"
    role="listitem"
  >
    <span
      class="bullet absolute -start-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
      :class="colorClass"
      aria-hidden="true"
    ></span>
    <p class="ml-4">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'AnimatedBulletItem',
  props: {
    delay: { type: Number, default: 0 },
    /** Tailwind color class (eg. 'bg-primary-500') */
    color: { type: String, default: 'bg-primary-500' }
  },
  computed: {
    colorClass() {
      return this.color;
    }
  }
};
</script>

<style scoped>
.flow-up {
  opacity: 0;
  transform: translateY(6px);
  animation: flowUp 560ms ease forwards;
}

@keyframes flowUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
