<script setup>
import { computed, ref } from 'vue'
import { scrollToTarget } from '../composables/useLenis'
import { useLocale } from '../composables/useLocale'
import logoUrl from '../assets/logo.svg'

const { t, locale, setLocale } = useLocale()

const menuOpen = ref(false)

const links = computed(() => [
  { label: t('nav.about'), target: '#about' },
  { label: t('nav.stack'), target: '#stack' },
  { label: t('nav.projects'), target: '#projects' },
  { label: t('nav.contact'), target: '#contact' },
])

function goTo(target) {
  menuOpen.value = false
  scrollToTarget(target)
}
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <a href="#hero" class="header__logo" @click.prevent="goTo('#hero')">
        <img :src="logoUrl" alt="Andrés F." class="header__logo-img" />
      </a>

      <div class="header__controls">
        <nav class="header__nav" :class="{ 'is-open': menuOpen }">
          <a
            v-for="link in links"
            :key="link.target"
            :href="link.target"
            class="header__link"
            @click.prevent="goTo(link.target)"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="header__lang">
          <button
            type="button"
            class="header__lang-btn"
            :class="{ 'is-active': locale === 'en' }"
            @click="setLocale('en')"
          >
            EN
          </button>
          <span class="header__lang-sep">/</span>
          <button
            type="button"
            class="header__lang-btn"
            :class="{ 'is-active': locale === 'es' }"
            @click="setLocale('es')"
          >
            ES
          </button>
        </div>

        <button
          class="header__toggle"
          :class="{ 'is-open': menuOpen }"
          :aria-expanded="menuOpen"
          :aria-label="t('header.menuToggle')"
          @click="menuOpen = !menuOpen"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  --accent: #1d9e75;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--header-height);
  display: flex;
  align-items: center;
  background: #212121;
  border-bottom: 1px solid rgba(240, 240, 240, 0.08);
}

.header__inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  align-items: center;
}

.header__logo-img {
  height: 34px;
  width: auto;
}

.header__controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header__lang {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.header__lang-btn {
  background: none;
  border: none;
  padding: 0;
  color: rgba(240, 240, 240, 0.45);
  cursor: pointer;
  transition: color 0.2s ease;
}

.header__lang-btn:hover {
  color: rgba(240, 240, 240, 0.8);
}

.header__lang-btn.is-active {
  color: var(--accent);
}

.header__lang-sep {
  color: rgba(240, 240, 240, 0.3);
  font-size: 0.75rem;
}

.header__link {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(240, 240, 240, 0.8);
  transition: color 0.2s ease;
}

.header__link:hover {
  color: var(--accent);
}

.header__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.header__toggle span {
  display: block;
  height: 1.5px;
  background: var(--text);
  transition: transform 0.25s ease;
}

.header__toggle.is-open span:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.header__toggle.is-open span:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

@media (max-width: 640px) {
  .header__toggle {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
    background: #212121;
    border-bottom: 1px solid rgba(240, 240, 240, 0.08);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .header__nav.is-open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}
</style>
