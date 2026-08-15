export const scrollReveal = {
  mounted(el) {
    el.classList.add('scroll-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          el.classList.toggle('is-visible', entry.isIntersecting)
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
