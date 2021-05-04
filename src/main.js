import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import webComponent from "../src/plugins/web-component"

createApp(App, {}).use(store).use(webComponent, {offerHash: 'aff44-widget'})
require("./assets/css/style.css")