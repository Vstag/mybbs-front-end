<script setup>
import { defineProps } from "vue";

const props = defineProps({
  // 状态码
  code: {
    type: String,
    default: "code",
  },
});
</script>

<template>
  <div class="bg">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <div class="contain">
    <div class="code">
      {{ code }}
    </div>
    <div class="info">
      <slot>这里是提示信息</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.bg > div {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #eee;
}

.bg > div:nth-child(1) {
  left: 20%;
}

.bg > div:nth-child(2) {
  left: 40%;
}

.bg > div:nth-child(3) {
  left: 60%;
}

.bg > div:nth-child(4) {
  left: 80%;
}

.bg > div:after {
  content: "";
  position: absolute;
  top: 0px;
  left: -0.5px;
  -webkit-transform: translateY(-160px);
  -ms-transform: translateY(-160px);
  transform: translateY(-160px);
  height: 160px;
  width: 2px;
  background-color: #00ffc0;
}

@-webkit-keyframes drop {
  90% {
    height: 20px;
  }
  100% {
    height: 160px;
    -webkit-transform: translateY(calc(100vh + 160px));
    transform: translateY(calc(100vh + 160px));
  }
}

@keyframes drop {
  90% {
    height: 20px;
  }
  100% {
    height: 160px;
    -webkit-transform: translateY(calc(100vh + 160px));
    transform: translateY(calc(100vh + 160px));
  }
}

.bg > div:nth-child(1):after {
  -webkit-animation: drop 3s infinite linear;
  animation: drop 3s infinite linear;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.bg > div:nth-child(2):after {
  -webkit-animation: drop 2s infinite linear;
  animation: drop 2s infinite linear;
  -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s;
}

.bg > div:nth-child(3):after {
  -webkit-animation: drop 3s infinite linear;
  animation: drop 3s infinite linear;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}

.bg > div:nth-child(4):after {
  -webkit-animation: drop 2s infinite linear;
  animation: drop 2s infinite linear;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
}

.contain {
  text-align: center;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .code {
    font-size: 100px;
    font-weight: bold;
    color: #222222;
    text-shadow: 4px 4px 0px #00ffc0;
    letter-spacing: 1.6px;
  }

  .info {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 1.6px;
  }
}
</style>
