<script setup>
import Header from '@/components/Header.vue'
import { disabled, load } from '@/utils/scroll'

</script>

<template>
    <div class="common-layout" 
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-immediate="true"
        :infinite-scroll-distance="1"
    >
        <!-- 菜单栏 -->
        <Header />

        <!-- 主体内容 -->
        <el-main>
            <router-view />
        </el-main>

        <!-- 回到顶部 -->
        <el-backtop class="hidden-sm-and-down" :right="30" :bottom="40" />
    </div>
</template>

<style scoped>
.el-main {
    padding: 15px 0;
}
</style>
