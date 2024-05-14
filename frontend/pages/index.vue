<template>
  <div class="">
    <hero-area/>
    <source-info />
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
