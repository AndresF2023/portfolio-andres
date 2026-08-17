# Portfolio — Andrés Filippi

Portfolio personal de desarrollador, construido con Vue 3 y Vite. Diseño oscuro y minimalista, con animaciones suaves, fondo 3D interactivo y contenido bilingüe (español/inglés).

## Stack

- **Vue 3** (`<script setup>`) + **Vite**
- **Three.js** — fondo animado en el Hero (shader/geometría renderizada sobre `<canvas>`)
- **Lenis** — scroll suave con inercia
- **GSAP** (`ScrollTrigger`) — sincronizado con Lenis para animaciones ligadas al scroll
- CSS puro con variables (sin frameworks de UI), iconos vía [Devicon](https://devicon.dev/) y [Tabler Icons](https://tabler.io/icons) cargados desde CDN

## Secciones

| Componente | Descripción |
|---|---|
| `Header.vue` | Nav fija con blur, menú hamburguesa en mobile y selector de idioma (EN/ES) |
| `Hero.vue` | Saludo + tagline con efecto typewriter hecho a mano, firma final animada |
| `About.vue` | Bio y trayectoria |
| `Stack.vue` | Grilla de tecnologías con íconos |
| `Projects.vue` | Grilla de proyectos con overlay a pantalla completa: carrusel de capturas, stack usado y link al sitio en vivo cuando existe |
| `Contact.vue` | Email, GitHub, LinkedIn, Upwork y descarga de CV (ES/EN, según idioma activo) |
| `Footer.vue` | Pie de página |
| `BackgroundScene.vue` | Escena Three.js de fondo, fija detrás de todo el contenido |

Todo el texto vive centralizado en [`src/i18n/translations.js`](src/i18n/translations.js) (incluyendo la data completa de cada proyecto), consumido a través del composable [`useLocale`](src/composables/useLocale.js). El idioma elegido se persiste en `localStorage`.

## Estructura del proyecto

```
src/
├── App.vue                  # orden de las secciones + init de Lenis
├── main.js
├── components/               # una sección/pieza de UI por archivo
├── composables/
│   ├── useLenis.js           # scroll suave (Lenis + GSAP ScrollTrigger)
│   └── useLocale.js          # i18n (locale reactivo + t())
├── directives/
│   └── scrollReveal.js       # v-scroll-reveal: fade-in al entrar en viewport (una sola vez)
├── i18n/
│   └── translations.js       # todo el contenido (en/es), incluyendo proyectos
├── utils/
│   └── techIcons.js          # helpers para íconos (Devicon/Tabler) + mapa nombre → ícono
└── style.css                 # variables globales, reset, layout base

public/
├── projects/                 # capturas de pantalla por proyecto
└── cv/                       # CVs descargables (ES/EN)
```

## Desarrollo local

Requiere Node.js 18+.

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`.

### Otros comandos

```bash
npm run build     # build de producción en dist/
npm run preview   # sirve el build de producción localmente
```

## Notas de implementación

- **Typewriter del Hero**: se implementa manipulando `textContent` directamente sobre refs del DOM (no con una librería), moviendo un único cursor `<span>` compartido entre los distintos textos a medida que se van escribiendo.
- **Scroll reveal**: `v-scroll-reveal` usa `IntersectionObserver` y revela el elemento una sola vez (se desuscribe tras el primer intersect), evitando parpadeos al hacer scroll con inercia cerca del punto de entrada/salida.
- **Overlay de proyectos**: usa `Teleport` a `body`; las capturas muy altas (landings largos) se detectan por relación de aspecto y se muestran scrolleables en vez de recortadas.
- **Responsive**: layout mobile-first en las secciones críticas (grilla de proyectos a 1 columna por debajo de 640px, ajustes de alineación en el Hero, etc.).

## Licencia

Proyecto personal — todo el contenido (textos, capturas, CVs) pertenece a Andrés Filippi.
