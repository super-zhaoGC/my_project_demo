<template>
  <div class="">
    <h1>home</h1>
  </div>
</template>

<script setup lang="ts">

import useUserStore from "@/store/modules/user";
import { onMounted } from "vue";

onMounted(() => {
  useUserStore().getUserInfo()
})
</script>

<style scoped></style>
