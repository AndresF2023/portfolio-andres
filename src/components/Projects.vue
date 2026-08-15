<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useLocale } from '../composables/useLocale'
import { startScroll, stopScroll } from '../composables/useLenis'
import { getTechIcon } from '../utils/techIcons'

const { t } = useLocale()

const projects = computed(() => t('projects.items'))

const activeIndex = ref(null)
const imageIndex = ref(0)

const activeProject = computed(() =>
  activeIndex.value === null ? null : projects.value[activeIndex.value]
)

function openProject(index) {
  activeIndex.value = index
  imageIndex.value = 0
  stopScroll()
}

function closeProject() {
  activeIndex.value = null
  startScroll()
}

function switchProject(index) {
  activeIndex.value = index
  imageIndex.value = 0
}

function imageCount(project) {
  return Array.isArray(project.images) ? project.images.length : project.images
}

// pantallazos de página completa (muy altos, ej. landing con scroll largo) no
// entran recortados en el marco fijo del carrusel: se muestran a tamaño
// natural y se pueden scrollear en vez de recortarlos con object-fit: cover
const GALLERY_RATIO = 16 / 10
const tallImageSrcs = ref(new Set())

function handleSlideImageLoad(e) {
  const img = e.target
  if (img.naturalWidth / img.naturalHeight < GALLERY_RATIO) {
    tallImageSrcs.value = new Set(tallImageSrcs.value).add(img.getAttribute('src'))
  }
}

function prevImage() {
  if (!activeProject.value) return
  const count = imageCount(activeProject.value)
  imageIndex.value = (imageIndex.value - 1 + count) % count
}

function nextImage() {
  if (!activeProject.value) return
  const count = imageCount(activeProject.value)
  imageIndex.value = (imageIndex.value + 1) % count
}

function handleKeydown(e) {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeProject()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

watch(activeIndex, (value) => {
  if (value === null) {
    window.removeEventListener('keydown', handleKeydown)
  } else {
    window.addEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (activeIndex.value !== null) startScroll()
})
</script>

<template>
  <section id="projects" class="projects">
    <div class="container" v-scroll-reveal>
      <span class="projects__label">{{ t('projects.label') }}</span>

      <div class="projects__grid">
        <button
          v-for="(project, index) in projects"
          :key="project.name"
          type="button"
          class="project-card"
          @click="openProject(index)"
        >
          <div class="project-card__header">
            <h3 class="project-card__name">{{ project.name }}</h3>
            <span v-if="project.inProduction" class="status-badge">
              <span class="status-dot"></span>
              {{ t('projects.inProduction') }}
            </span>
          </div>
          <p class="project-card__description">{{ project.shortDescription }}</p>
          <ul class="project-card__tags">
            <li v-for="(tag, j) in project.tags" :key="j" class="project-card__tag">
              <template v-if="getTechIcon(tag)">
                <span
                  v-if="getTechIcon(tag).mask"
                  class="tag-icon tag-icon--mask"
                  :style="{ maskImage: `url('${getTechIcon(tag).icon}')`, WebkitMaskImage: `url('${getTechIcon(tag).icon}')` }"
                  aria-hidden="true"
                ></span>
                <img
                  v-else
                  :src="getTechIcon(tag).icon"
                  :alt="tag"
                  class="tag-icon"
                  :class="{ 'tag-icon--invert': getTechIcon(tag).invert }"
                  width="14"
                  height="14"
                  loading="lazy"
                />
              </template>
              {{ tag }}
            </li>
          </ul>
          <span class="project-card__link">{{ t('projects.viewDetails') }} <span class="project-card__arrow">→</span></span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="overlay-fade">
        <div v-if="activeProject" class="project-overlay">
          <button type="button" class="project-overlay__close" :aria-label="t('projects.close')" @click="closeProject">
            ×
          </button>

          <div class="project-overlay__body">
            <aside class="project-overlay__tabs">
              <button
                v-for="(project, index) in projects"
                :key="project.name"
                type="button"
                class="project-overlay__tab"
                :class="{ 'is-active': index === activeIndex }"
                @click="switchProject(index)"
              >
                <span v-if="project.inProduction" class="status-dot status-dot--tab"></span>
                {{ project.name }}
              </button>
            </aside>

            <div class="project-overlay__content">
              <div class="project-overlay__gallery">
                <div
                  class="project-overlay__track"
                  :style="{ transform: `translateX(-${imageIndex * 100}%) translateZ(0)` }"
                >
                  <div
                    v-for="n in imageCount(activeProject)"
                    :key="n"
                    class="project-overlay__slide"
                  >
                    <img
                      v-if="Array.isArray(activeProject.images)"
                      :src="activeProject.images[n - 1]"
                      :alt="`${activeProject.name} — ${t('projects.screenshot')} ${n}`"
                      class="project-overlay__slide-img"
                      :class="{ 'project-overlay__slide-img--tall': tallImageSrcs.has(activeProject.images[n - 1]) }"
                      @load="handleSlideImageLoad"
                    />
                    <template v-else>{{ t('projects.screenshot') }} {{ n }}</template>
                  </div>
                </div>

                <button
                  v-if="imageCount(activeProject) > 1"
                  type="button"
                  class="project-overlay__nav project-overlay__nav--prev"
                  :aria-label="t('projects.prevImage')"
                  @click="prevImage"
                >
                  ‹
                </button>
                <button
                  v-if="imageCount(activeProject) > 1"
                  type="button"
                  class="project-overlay__nav project-overlay__nav--next"
                  :aria-label="t('projects.nextImage')"
                  @click="nextImage"
                >
                  ›
                </button>

                <div v-if="imageCount(activeProject) > 1" class="project-overlay__dots">
                  <button
                    v-for="n in imageCount(activeProject)"
                    :key="n"
                    type="button"
                    class="project-overlay__dot"
                    :class="{ 'is-active': n - 1 === imageIndex }"
                    :aria-label="`${t('projects.screenshot')} ${n}`"
                    @click="imageIndex = n - 1"
                  ></button>
                </div>
              </div>

              <div class="project-overlay__info">
                <div class="project-overlay__header">
                  <h3 class="project-overlay__name">{{ activeProject.name }}</h3>
                  <span v-if="activeProject.inProduction" class="status-badge">
                    <span class="status-dot"></span>
                    {{ t('projects.inProduction') }}
                  </span>
                </div>
                <p class="project-overlay__description">{{ activeProject.description }}</p>

                <span class="project-overlay__stack-label">{{ t('projects.stack') }}</span>
                <ul class="project-overlay__stack">
                  <li v-for="(tag, j) in activeProject.tags" :key="j" class="project-overlay__tag">
                    <template v-if="getTechIcon(tag)">
                      <span
                        v-if="getTechIcon(tag).mask"
                        class="tag-icon tag-icon--mask"
                        :style="{ maskImage: `url('${getTechIcon(tag).icon}')`, WebkitMaskImage: `url('${getTechIcon(tag).icon}')` }"
                        aria-hidden="true"
                      ></span>
                      <img
                        v-else
                        :src="getTechIcon(tag).icon"
                        :alt="tag"
                        class="tag-icon"
                        :class="{ 'tag-icon--invert': getTechIcon(tag).invert }"
                        width="14"
                        height="14"
                        loading="lazy"
                      />
                    </template>
                    {{ tag }}
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.projects {
  min-height: auto;
}

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
  background: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.project-card:hover {
  border-color: #1d9e75;
  transform: translateY(-4px);
  box-shadow: 0 0 0 1px rgba(29, 158, 117, 0.15), 0 10px 24px rgba(29, 158, 117, 0.1);
}

.project-card__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 0.9rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(240, 240, 240, 0.15);
  border-radius: 999px;
  color: rgba(240, 240, 240, 0.65);
}

.tag-icon {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.tag-icon--invert {
  filter: invert(1);
}

.tag-icon--mask {
  display: inline-block;
  background-color: var(--accent);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
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

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #eab308;
}

.status-dot {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #eab308;
  animation: status-pulse 1.6s ease-in-out infinite;
}

.status-dot--tab {
  margin-right: 0.15rem;
}

@keyframes status-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.55);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(234, 179, 8, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(234, 179, 8, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot {
    animation: none;
  }
}

/* Overlay a pantalla completa */
.project-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #212121;
  overflow-y: auto;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.project-overlay__close {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(240, 240, 240, 0.15);
  background: rgba(33, 33, 33, 0.7);
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.project-overlay__close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.project-overlay__body {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.project-overlay__tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 5rem 1.5rem 1.5rem;
}

.project-overlay__tab {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  background: none;
  border: 1px solid rgba(240, 240, 240, 0.15);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(240, 240, 240, 0.6);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.project-overlay__tab.is-active {
  border-color: var(--accent);
  color: var(--accent);
}

.project-overlay__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem 3rem;
  gap: 2.5rem;
}

@media (min-width: 900px) {
  .project-overlay__content {
    flex-direction: row;
    padding: 0 3rem 3rem;
    gap: 3rem;
  }
}

.project-overlay__gallery {
  position: relative;
  flex: 1.4;
  min-width: 0;
  border-radius: 16px;
  overflow: hidden;
}

.project-overlay__track {
  display: flex;
  aspect-ratio: 16 / 10;
  transition: transform 0.35s ease;
  will-change: transform;
}

.project-overlay__slide {
  flex: 0 0 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  border: 1px solid rgba(240, 240, 240, 0.1);
  color: rgba(240, 240, 240, 0.35);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  overflow-x: hidden;
  overflow-y: auto;
}

.project-overlay__slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  flex-shrink: 0;
}

.project-overlay__slide-img--tall {
  height: auto;
  object-fit: initial;
}

.project-overlay__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(240, 240, 240, 0.15);
  background: rgba(33, 33, 33, 0.7);
  color: var(--text);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.project-overlay__nav:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.project-overlay__nav--prev {
  left: 1rem;
}

.project-overlay__nav--next {
  right: 1rem;
}

.project-overlay__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.project-overlay__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  background: rgba(240, 240, 240, 0.25);
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.project-overlay__dot.is-active {
  background: var(--accent);
}

.project-overlay__info {
  flex: 1;
  min-width: 0;
}

.project-overlay__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.7rem 1rem;
}

.project-overlay__name {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 600;
}

.project-overlay__description {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(240, 240, 240, 0.75);
}

.project-overlay__stack-label {
  display: block;
  margin-top: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(240, 240, 240, 0.45);
}

.project-overlay__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.9rem;
}

.project-overlay__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(240, 240, 240, 0.15);
  border-radius: 999px;
  color: rgba(240, 240, 240, 0.65);
}

</style>
