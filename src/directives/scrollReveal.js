export const scrollReveal = {
  mounted(el) {
    el.classList.add('scroll-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    el._scrollRevealObserver = observer
  },
  unmounted(el) {
    el._scrollRevealObserver?.disconnect()
  },
}
