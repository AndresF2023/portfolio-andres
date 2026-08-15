<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { devicon, tabler } from '../utils/techIcons'

const { t, locale } = useLocale()

const links = computed(() => [
  {
    name: 'Email',
    href: 'mailto:andresfilippi1123@gmail.com',
    display: 'andresfilippi1123@gmail.com',
    external: false,
    download: false,
    ...tabler('mail'),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/AndresF2023',
    display: 'GitHub',
    external: true,
    download: false,
    ...devicon('github/github-original', true),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andrés-filippi-870610308/',
    display: 'LinkedIn',
    external: true,
    download: false,
    ...devicon('linkedin/linkedin-original'),
  },
  {
    name: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~010a04d2c145f83b2a',
    display: 'Upwork',
    external: true,
    download: false,
    ...tabler('brand-upwork'),
  },
  {
    name: 'CV',
    href: locale.value === 'es' ? '/cv/andres-filippi-cv-es.pdf' : '/cv/andres-filippi-cv-en.pdf',
    display: t('contact.downloadCV'),
    external: false,
    download: true,
    ...tabler('download'),
  },
])
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
            :download="link.download || undefined"
          >
            <span
              v-if="link.mask"
              class="contact__icon contact__icon--mask"
              :style="{ maskImage: `url('${link.icon}')`, WebkitMaskImage: `url('${link.icon}')` }"
              aria-hidden="true"
            ></span>
            <img
              v-else
              :src="link.icon"
              alt=""
              class="contact__icon"
              :class="{ 'contact__icon--invert': link.invert }"
              width="18"
              height="18"
              loading="lazy"
            />
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
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.05rem;
  font-weight: 500;
  padding-bottom: 0.2rem;
}

.contact__icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.contact__icon--invert {
  filter: invert(1);
}

.contact__icon--mask {
  display: inline-block;
  background-color: var(--accent);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
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
