<template>
  <div id="dang">
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
#dang{
  height:100vh;
  margin: 0;
  --x: calc(var(--posX, 0) * 1px);
  --y: calc(var(--posY, 0) * 1px);
  background-image: 
    linear-gradient(115deg, rgb(255 215 215), rgb(255 255 255)), 
    radial-gradient( 90% 100% at calc( 50% + var(--x)) calc( 0% + var(--y)), rgb(200 200 200), rgb(022 000 045)), 
    radial-gradient(100% 100% at calc( 80% - var(--x)) calc( 0% - var(--y)), rgb(250 255 000), rgb(036 000 000)), 
    radial-gradient(150% 210% at calc(100% + var(--x)) calc( 0% + var(--y)), rgb(020 175 125), rgb(000 010 255)), 
    radial-gradient(100% 100% at calc(100% - var(--x)) calc(30% - var(--y)), rgb(255 077 000), rgb(000 200 255)), 
    linear-gradient(60deg, rgb(255 255 255), rgb(255 255 255));
  background-blend-mode: overlay, overlay, difference, difference, difference, normal;
}
</style>

<script setup lang="js">
import { onMounted } from 'vue';

console.log('dang',document.querySelector("#dang"));
onMounted(()=>{
  document.querySelector("#dang").addEventListener("pointermove", (e)=>{
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty('--posX',  x-l-w/2);
    el.style.setProperty('--posY',  y-t-h/2);
  })
});

</script>