<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <section id="about" class="about">
    <div class="container" v-scroll-reveal>
      <span class="about__label">{{ t('about.label') }}</span>
      <div class="about__text">
        <p>{{ t('about.bio1') }}</p>
        <p>{{ t('about.bio2') }}</p>
        <p>{{ t('about.bio3') }}</p>
        <p>{{ t('about.bio4') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.about__text {
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  font-weight: 400;
  line-height: 1.6;
  max-width: 640px;
}

.about__text p + p {
  margin-top: 1.25rem;
}
</style>
