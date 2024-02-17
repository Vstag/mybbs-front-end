<script setup>
import { GithubOne, Twitter, Wechat } from "@icon-park/vue-next";
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <!-- 左侧 -->
      <!-- <div class="logo"></div> -->
      <div class="offical">
        <el-link
          :icon="GithubOne"
          :underline="false"
          target="_blank"
          href="#"
        />
        <el-link :icon="Twitter" :underline="false" target="_blank" href="#" />
        <el-link :icon="Wechat" :underline="false" target="_blank" href="#" />
      </div>

      <!-- 右侧 -->
      <div class="about">
        <div class="link">
          <el-link :underline="false" target="_blank" href="#"
            >关于我们</el-link
          >
          <el-link :underline="false" target="_blank" href="#"
            >联系我们</el-link
          >
          <el-link :underline="false" target="_blank" href="#"
            >加入我们</el-link
          >
        </div>
        <div class="text">
          <span>myFourm ©2024 Created by Vstag</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  background-color: var(--footer-bg-color);
  font-size: 14px;
  color: white;

  .footer-content {
    max-width: 1140px;
    padding: 25px 12px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // flex-wrap: wrap;

    .logo {
      margin-right: 40px;
      background-image: url("@/assets/default.png");
      width: 42px;
      height: 42px;
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 50%;
      margin-top: 0;
      -webkit-tap-highlight-color: transparent;
      transition: all 0.5s;
    }

    .offical {
      // display: flex;
      flex: 1;
      min-width: 150px;

      .el-link {
        font-size: 24px;
        color: white;
        padding: 12px;
      }
    }

    .about {
      display: block;

      .link {
        display: flex;
        justify-content: flex-end;

        .el-link {
          margin-left: 15px;
          color: white;
        }
      }

      .text {
        font-size: small;
        color: #8e8787;
        margin-top: 8px;
        text-align: right;
      }
    }
  }
}
</style>
