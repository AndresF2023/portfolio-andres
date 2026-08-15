<script setup>
import { onMounted, onUnmounted } from 'vue'
import { initLenis, destroyLenis } from './composables/useLenis'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Stack from './components/Stack.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import BackgroundScene from './components/BackgroundScene.vue'
import Header from './components/Header.vue'

onMounted(() => {
  initLenis()
})

onUnmounted(() => {
  destroyLenis()
})
</script>

<template>
  <main>
    <BackgroundScene />
    <Header />
    <Hero />
    <About />
    <Stack />
    <Projects />
    <Contact />
    <Footer />
  </main>
</template>
