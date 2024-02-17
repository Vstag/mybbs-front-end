import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import "./assets/main.scss";
import "./assets/themes/default-theme.scss"; // 主题
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "element-plus/theme-chalk/dark/css-vars.css"; // 黑暗模式主题
import "element-plus/theme-chalk/src/message.scss";
import "@icon-park/vue-next/styles/index.css";

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
app.use(router);
app.use(ElementPlus, { locale: zhCn });
app.use(pinia);
pinia.use(persist);
app.mount("#app");

// 使用HTTP中间件
import installHttp from './utils/http'
installHttp(router)