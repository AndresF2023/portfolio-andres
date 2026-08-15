<script setup>
import { useLocale } from '../composables/useLocale'
import { getTechIcon } from '../utils/techIcons'

const { t } = useLocale()

const categories = [
  {
    name: 'Core Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Backend / Full-Stack',
    items: ['Node.js', 'REST API Development', 'PostgreSQL'],
  },
  {
    name: 'Auth & Infra',
    items: ['Supabase', 'Vercel', 'Web Application Security'],
  },
  {
    name: 'Design Tools',
    items: ['Figma', 'Adobe Creative Suite'],
  },
  {
    name: 'Dev Tools',
    items: ['GitHub', 'VS Code'],
  },
  {
    name: 'Practices',
    items: ['Full-Stack Development', 'Responsive Web Design'],
  },
  {
    name: 'Differentiators',
    items: ['AI Integration', 'Claude', 'Python', 'API Integration'],
  },
]
</script>

<template>
  <section id="stack" class="stack">
    <div class="container" v-scroll-reveal>
      <span class="stack__label">{{ t('stack.label') }}</span>

      <div class="stack__grid">
        <div v-for="category in categories" :key="category.name" class="stack__group">
          <h3 class="stack__category">{{ category.name }}</h3>
          <ul class="stack__items">
            <li v-for="item in category.items" :key="item" class="stack__item">
              <template v-if="getTechIcon(item)">
                <span
                  v-if="getTechIcon(item).mask"
                  class="stack__icon stack__icon--mask"
                  :style="{ maskImage: `url('${getTechIcon(item).icon}')`, WebkitMaskImage: `url('${getTechIcon(item).icon}')` }"
                  aria-hidden="true"
                ></span>
                <img
                  v-else
                  :src="getTechIcon(item).icon"
                  :alt="item"
                  class="stack__icon"
                  :class="{ 'stack__icon--invert': getTechIcon(item).invert }"
                  width="20"
                  height="20"
                  loading="lazy"
                />
              </template>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack {
  min-height: auto;
}

.stack__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2.5rem;
}

.stack__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1.25rem;
}

@media (min-width: 640px) {
  .stack__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem 2rem;
  }
}

.stack__category {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.stack__items {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.stack__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: rgba(240, 240, 240, 0.75);
}

.stack__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.stack__icon--invert {
  filter: invert(1);
}

.stack__icon--mask {
  display: inline-block;
  background-color: var(--accent);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}
</style>
