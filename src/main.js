import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 黑暗模式主题
// import './bootstrapt/font/bootstrap-icons.css'
// import './bootstrapt/css/bootstrap.css'
// // import './bootstrapt/js/bootstrap.min'
// import './bootstrapt/js/bootstrap.bundle'

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
app.use(router)
app.use(pinia)
pinia.use(persist)
app.use(ElementPlus)

// 导入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

