import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/style/common.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import preview from 'v-image-preview'


const app = createApp(App)
for (let iconName in ElementPlusIconsVue) {
    app.component(iconName, ElementPlusIconsVue[iconName])
}
app.use(router).use(store).use(ElementPlus).use(preview).mount('#app')

