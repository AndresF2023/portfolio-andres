<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

const categories = [
  {
    name: 'Core Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
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
    name: 'Practices',
    items: ['Full-Stack Development', 'Responsive Web Design'],
  },
  {
    name: 'Differentiators',
    items: ['AI Integration', 'Python', 'API Integration'],
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
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  gap: 0.6rem;
}

.stack__item {
  font-size: 0.95rem;
  color: rgba(240, 240, 240, 0.75);
  padding-left: 1rem;
  position: relative;
}

.stack__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}
</style>
