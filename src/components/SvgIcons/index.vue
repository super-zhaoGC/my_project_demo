<template>
  <div class="">
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '0',
  },
  height: {
    type: String,
    default: '0',
  }
})
</script>

<style scoped></style>
