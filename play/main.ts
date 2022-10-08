import { createApp } from "vue"
import App from "./app.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import VForm from "@vue3-components/components/v-form"
import "@vue3-components/theme-chalk/src/index.scss"

const app = createApp(App)
app.use(ElementPlus)
app.use(VForm)
app.mount("#app")
