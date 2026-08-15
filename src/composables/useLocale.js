import { ref, watchEffect } from 'vue'
import { translations } from '../i18n/translations'

const STORAGE_KEY = 'portfolio-locale'

const locale = ref(localStorage.getItem(STORAGE_KEY) || 'en')

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, locale.value)
})

watchEffect(() => {
  document.title = translations[locale.value].meta.title
})

function setLocale(newLocale) {
  locale.value = newLocale
}

function t(key) {
  const value = key.split('.').reduce((acc, part) => acc?.[part], translations[locale.value])
  return value ?? key
}

export function useLocale() {
  return { locale, setLocale, t }
}
