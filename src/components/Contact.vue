<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

const links = [
  {
    name: 'Email',
    href: 'mailto:andresfilippi1123@gmail.com',
    display: 'andresfilippi1123@gmail.com',
    external: false,
  },
  {
    name: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~010a04d2c145f83b2a',
    display: 'Upwork',
    external: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andrés-filippi-870610308/',
    display: 'LinkedIn',
    external: true,
  },
]
</script>

<template>
  <section id="contact" class="contact">
    <div class="container" v-scroll-reveal>
      <span class="contact__label">{{ t('contact.label') }}</span>
      <h2 class="contact__heading">{{ t('contact.heading') }}</h2>

      <ul class="contact__links">
        <li v-for="link in links" :key="link.name">
          <a
            :href="link.href"
            class="contact__link"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            {{ link.display }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact {
  min-height: auto;
  padding-bottom: calc(var(--space-section) * 1.5);
}

.contact__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.contact__heading {
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  max-width: 640px;
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-top: 2.5rem;
}

.contact__link {
  position: relative;
  font-size: 1.05rem;
  font-weight: 500;
  padding-bottom: 0.2rem;
}

.contact__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.contact__link:hover::after {
  transform: scaleX(1);
}
</style>
