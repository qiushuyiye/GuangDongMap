import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css';
import axios from 'axios';
import Vue3Autocounter from 'vue3-autocounter';

const app = createApp(App);

// 全局注册 axios
app.config.globalProperties.$axios = axios;

// 设置全局的 Axios 实例
// axios.defaults.baseURL = 'http://localhost:8081'; // 设置基础URL

// 使用Vue Router、Vuex和Element Plus
app.use(store).use(router).use(ElementPlus).component('vue3-autocounter', Vue3Autocounter);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 挂载Vue实例
app.mount('#app');
