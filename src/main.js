import {createApp} from 'vue'
import App from './App.vue'
import Outable from "../packages/index.js"

const app = createApp(App)
app.use(Outable)
app.mount('#app')
