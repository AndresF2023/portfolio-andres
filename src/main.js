import { createApp } from 'vue'
import 'lenis/dist/lenis.css'
import './style.css'
import App from './App.vue'
import { scrollReveal } from './directives/scrollReveal'

const app = createApp(App)
app.directive('scroll-reveal', scrollReveal)
app.mount('#app')
