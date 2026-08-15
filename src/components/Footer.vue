<script setup>
import { useLocale } from '../composables/useLocale'
import logoUrl from '../assets/logo.svg'

const { t } = useLocale()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <img :src="logoUrl" alt="Andrés F." class="footer__logo" />
      <span class="footer__copyright">© {{ year }} Andrés Filippi. {{ t('footer.rights') }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 1.5rem;
  border-top: 1px solid rgba(240, 240, 240, 0.08);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer__logo {
  height: 22px;
  width: auto;
  opacity: 0.7;
}

.footer__copyright {
  font-size: 0.8rem;
  color: rgba(240, 240, 240, 0.5);
}
</style>
