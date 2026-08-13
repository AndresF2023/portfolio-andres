<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

const projects = [
  {
    name: 'LubriBox',
    description: '[PROJECT DESCRIPTION]',
    tags: ['[TECH]', '[TECH]', '[TECH]'],
    link: '#',
  },
  {
    name: 'Tennis Academy System',
    description: '[PROJECT DESCRIPTION]',
    tags: ['[TECH]', '[TECH]', '[TECH]'],
    link: '#',
  },
]
</script>

<template>
  <section id="projects" class="projects">
    <div class="container" v-scroll-reveal>
      <span class="projects__label">{{ t('projects.label') }}</span>

      <div class="projects__grid">
        <a
          v-for="project in projects"
          :key="project.name"
          :href="project.link"
          class="project-card"
        >
          <h3 class="project-card__name">{{ project.name }}</h3>
          <p class="project-card__description">{{ project.description }}</p>
          <ul class="project-card__tags">
            <li v-for="(tag, j) in project.tags" :key="j" class="project-card__tag">
              {{ tag }}
            </li>
          </ul>
          <span class="project-card__link">{{ t('projects.viewProject') }} <span class="project-card__arrow">→</span></span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2.5rem;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .projects__grid {
    gap: 1.5rem;
  }
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid rgba(240, 240, 240, 0.12);
  border-radius: 12px;
  transition: border-color 0.25s ease-out, transform 0.25s ease-out, box-shadow 0.25s ease-out;
}

.project-card:hover {
  border-color: #1d9e75;
  transform: translateY(-4px);
  box-shadow: 0 0 0 1px rgba(29, 158, 117, 0.15), 0 10px 24px rgba(29, 158, 117, 0.1);
}

.project-card__name {
  font-size: 1.3rem;
  font-weight: 600;
}

.project-card__description {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(240, 240, 240, 0.75);
  flex-grow: 1;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.project-card__tag {
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(240, 240, 240, 0.15);
  border-radius: 999px;
  color: rgba(240, 240, 240, 0.65);
}

.project-card__link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.project-card__arrow {
  transition: transform 0.25s ease;
}

.project-card:hover .project-card__arrow {
  transform: translate(2px, -2px);
}
</style>
