<script setup>
import Status from '@/components/Status.vue'
</script>

<template>
  <Status :code="404">
    资源未找到
    <br>
    请检查URL是否正确
  </Status>
</template>

<style lang="scss" scoped>
</style>
