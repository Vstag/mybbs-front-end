import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import './bootstrapt/font/bootstrap-icons.css'
import './bootstrapt/css/bootstrap.css'
// import './bootstrapt/js/bootstrap.min'
import './bootstrapt/js/bootstrap.bundle'

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
app.use(router)
app.use(pinia)
pinia.use(persist)
app.mount('#app')
