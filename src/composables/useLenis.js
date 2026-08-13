import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

// Inicializa Lenis y lo sincroniza con el ticker de GSAP para que
// ScrollTrigger reciba las posiciones de scroll suavizadas.
export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function scrollToTarget(target) {
  if (!lenis) return
  lenis.scrollTo(target)
}

export function destroyLenis() {
  if (!lenis) return
  lenis.destroy()
  lenis = null
}
