<script setup>
import Status from '@/components/Status.vue'
</script>

<template>
  <div class="bg"></div>
  <Status :code="500">
    抱歉，服务器出错了
  </Status>
</template>

<style lang="scss" scoped>
</style>
