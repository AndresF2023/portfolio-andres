<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLocale } from '../composables/useLocale'
import { scrollToTarget } from '../composables/useLenis'

const { t, locale } = useLocale()

const nameRef = ref(null)
const titleRef = ref(null)
const nameTextRef = ref(null)
const titleWrapRef = ref(null)
const titleTextRef = ref(null)
const signatureWrapRef = ref(null)
const signatureTextRef = ref(null)
const cursorRef = ref(null)

const SIGNATURE_NAME = 'Andrés Filippi'

const TYPE_SPEED = 45
const START_DELAY = 300
const LINE_PAUSE = 350

let runId = 0
let pendingTimeout = null

function wait(ms) {
  return new Promise((resolve) => {
    pendingTimeout = setTimeout(resolve, ms)
  })
}

function typeText(el, text, myRunId) {
  return new Promise((resolve) => {
    let i = 0
    function step() {
      if (myRunId !== runId) return
      if (i < text.length) {
        el.textContent += text.charAt(i)
        i++
        pendingTimeout = setTimeout(step, TYPE_SPEED)
      } else {
        resolve()
      }
    }
    step()
  })
}

async function runTypewriter() {
  runId++
  const myRunId = runId

  clearTimeout(pendingTimeout)

  const nameEl = nameRef.value
  const titleEl = titleRef.value
  const nameTextEl = nameTextRef.value
  const titleWrapEl = titleWrapRef.value
  const titleTextEl = titleTextRef.value
  const signatureWrapEl = signatureWrapRef.value
  const signatureTextEl = signatureTextRef.value
  const cursorEl = cursorRef.value

  if (
    !nameEl ||
    !titleEl ||
    !nameTextEl ||
    !titleWrapEl ||
    !titleTextEl ||
    !signatureWrapEl ||
    !signatureTextEl ||
    !cursorEl
  )
    return

  nameTextEl.textContent = ''
  titleTextEl.textContent = ''
  signatureTextEl.textContent = ''
  cursorEl.style.display = ''
  nameEl.appendChild(cursorEl)

  await wait(START_DELAY)
  if (myRunId !== runId) return

  await typeText(nameTextEl, t('hero.greeting'), myRunId)
  if (myRunId !== runId) return

  await wait(LINE_PAUSE)
  if (myRunId !== runId) return

  titleWrapEl.appendChild(cursorEl)
  await typeText(titleTextEl, t('hero.tagline'), myRunId)
  if (myRunId !== runId) return

  await wait(LINE_PAUSE)
  if (myRunId !== runId) return

  signatureWrapEl.appendChild(cursorEl)
  await typeText(signatureTextEl, ` ${SIGNATURE_NAME}`, myRunId)
}

onMounted(() => {
  runTypewriter()
})

onBeforeUnmount(() => {
  runId++
  clearTimeout(pendingTimeout)
})

watch(locale, () => {
  runTypewriter()
})

function goToAbout() {
  scrollToTarget('#about')
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="container hero__inner">
      <h1 ref="nameRef" class="hero__name"><span ref="nameTextRef"></span></h1>
      <p ref="titleRef" class="hero__title">
        <span ref="titleWrapRef" class="hero__tagline-wrap"><span ref="titleTextRef"></span></span><span ref="signatureWrapRef" class="hero__signature-wrap"><span ref="signatureTextRef" class="hero__signature"></span></span>
      </p>
      <span ref="cursorRef" class="typewriter-cursor" aria-hidden="true"></span>

      <button type="button" class="scroll-indicator" @click="goToAbout">
        <span class="scroll-indicator__label">{{ t('hero.scrollHint') }}</span>
        <svg
          class="scroll-indicator__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="7" />
          <circle class="scroll-indicator__wheel" cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: var(--space-section);
  padding-bottom: var(--space-section);
  overflow: hidden;
}

.hero__inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

.hero__name {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero__title {
  margin-top: 1.25rem;
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  font-weight: 400;
  color: var(--accent);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.hero__signature-wrap {
  margin-left: auto;
  margin-right: calc(5.75rem - 7px);
  padding-left: 1rem;
  color: var(--text);
}

.hero__signature {
  color: var(--text);
  font-weight: 600;
}

.typewriter-cursor {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  margin-left: 3px;
  background: currentColor;
  vertical-align: text-bottom;
  transform: translateY(-2px);
  animation: cursor-blink 0.9s step-end infinite;
}

@keyframes cursor-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}

.scroll-indicator {
  width: fit-content;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text);
}

.scroll-indicator__label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(240, 240, 240, 0.6);
}

.scroll-indicator__icon {
  width: 26px;
  height: 40px;
}

.scroll-indicator__wheel {
  transform-box: fill-box;
  transform-origin: center;
  animation: scroll-wheel 1.6s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(4px);
    opacity: 0.3;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
