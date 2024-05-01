<template>
  <div class="">
    <hero-area/>
    <product-lists/>
    <features/>
    <benefits/>
    <reviews/>
  </div>
</template>
<script lang="ts" setup>

definePageMeta({
  pageTransition: {
    name: 'bounce',
    mode: 'out-in' // default
  }
})
</script>
