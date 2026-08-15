export const translations = {
  en: {
    meta: {
      title: 'Andrés Filippi — Software Developer',
    },
    nav: {
      about: 'About',
      stack: 'Stack',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello stranger! Nice to have you here',
      tagline: "Let's build together!",
      scrollHint: 'Have a look',
    },
    about: {
      label: 'About',
      bio1: "I'm Andrés, a programming technician from UTN (Córdoba, Argentina), graduated with honors. I work as a freelance developer building custom web solutions, from management platforms to AI-powered tools.",
      bio2: "My approach is iterative, I'd rather dive in, explore, and adjust along the way. That trial-and-error process is where I find the best results. I work autonomously, but I stay close to the client throughout: at the end of the day, the project is for them, and I want the result to reflect who they are as much as it reflects who I am.",
      bio3: "What I care about most in every delivery is that it feels fresh, creative, visually considered, and unlike anything I've built before.",
      bio4: "Got a project in mind? I'd love to hear about it.",
    },
    stack: {
      label: 'Stack',
    },
    projects: {
      label: 'Projects',
      viewDetails: 'View details',
      close: 'Close',
      stack: 'Stack',
      screenshot: 'Screenshot',
      prevImage: 'Previous screenshot',
      nextImage: 'Next screenshot',
      inProduction: 'In production',
      items: [
        {
          name: 'LubriBox',
          shortDescription:
            'Website for an oil change shop, with a vehicle-based price calculator and online appointment booking.',
          description:
            "Website for LubriBox Car Service, an oil change shop in Córdoba, Argentina. Customers select their car's brand, model, and year, and the system calculates the exact price for each service based on the engine's oil capacity — backed by a catalog of over 200 models across 17 brands verified for the Argentine market. It also lets customers book an appointment through a 3-step form that opens WhatsApp with a pre-filled message and generates a Google Calendar link. It includes an admin panel with protected login to manage services and categories, with changes persisted to Vercel Blob.",
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
          inProduction: false,
          images: [
            '/projects/lubribox/main.png',
            '/projects/lubribox/turnos.png',
            '/projects/lubribox/adminlog.png',
            '/projects/lubribox/paneladmin.png',
          ],
        },
        {
          name: 'Tennis Academy System',
          shortDescription:
            'Management platform for tennis academies, with player tracking, video exercises, and training planning.',
          description:
            "A private platform for tennis coaches that centralizes the staff's daily workflow. It includes a video exercise library organized by technique, with personalized notes per exercise. The players section goes beyond a simple list: each profile tracks playing style, level, strengths, technical corrections, and a tournament calendar. It also includes daily, weekly, and monthly training planning, plus an admin panel to manage which staff members have administrator access. Players, in turn, have access to their own platform where they can view their profile, areas to improve, physical condition, etc.",
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
          inProduction: false,
          images: [
            '/projects/tennis-academy-system/ingreso.png',
            '/projects/tennis-academy-system/gestion.png',
            '/projects/tennis-academy-system/admin.png',
            '/projects/tennis-academy-system/biblioteca.png',
            '/projects/tennis-academy-system/jugadores.png',
            '/projects/tennis-academy-system/planificacion.png',
          ],
        },
        {
          name: 'Gastaldi Distributions',
          shortDescription:
            'Online product catalog for a distribution company, with direct WhatsApp contact and an admin panel to manage stock and pricing.',
          description:
            'Catalog website for Gastaldi Distributions, a distribution company that showcases its products with up-to-date pricing and stock availability. Customers can browse the catalog and reach out directly via WhatsApp to place orders. It includes an admin panel where the team can add, edit, and remove products, update prices, and mark items as in stock or sold out — reflecting those changes in real time for both the internal team and customers browsing the catalog.',
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          inProduction: true,
          images: [
            '/projects/gastaldi-distributions/main.png',
            '/projects/gastaldi-distributions/admin.png',
          ],
        },
        {
          name: 'BOLT. Architecture & Design Studio',
          shortDescription:
            'Landing page/portfolio for an architecture and design studio, with projects organized by type, a downloadable commercial proposal, and contact via form.',
          description:
            'Portfolio website for BOLT, an architecture and design studio based in Córdoba, Argentina, working across Argentina, Paraguay, and Guatemala on projects of different scales: single-family homes, commercial spaces, apartment buildings, collective housing, and educational facilities. The site showcases their projects and the three service tiers they offer — visualization only, preliminary design with renders, or a complete project with construction-ready documentation — with 3D visualization as a core part of every presentation. It includes downloadable PDFs of their commercial proposal and portfolio, and a contact button that redirects to a Google Forms submission.',
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          inProduction: true,
          images: ['/projects/bolt/main.png'],
        },
        {
          name: 'WC Calculator',
          shortDescription:
            "Workers' compensation (WC) settlement calculator for law firms, applying Argentina's Ley 24.557 formulas by claim type.",
          description:
            "A workers' compensation settlement calculator built for law firms, applying Argentina's Ley 24.557 and 26.773 formulas based on claim type: temporary disability, partial or total permanent disability, severe disability, or death. It automatically calculates the worker's age, compares the formula result against the legally required minimum floors (editable and saved locally), and applies the 20% commute-accident surcharge when applicable. Each calculation shows a step-by-step breakdown, with printable/PDF-ready results. Everything runs entirely client-side, with no backend or data transmission.",
          tags: ['HTML5', 'CSS3', 'JavaScript'],
          inProduction: false,
          images: ['/projects/wc-calculator/main.jpg'],
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: "Let's work together?",
    },
    header: {
      menuToggle: 'Open menu',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  es: {
    meta: {
      title: 'Andrés Filippi — Desarrollador de Software',
    },
    nav: {
      about: 'Acerca de',
      stack: 'Stack',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      greeting: '¡Hola desconocido! Qué bueno tenerte por acá',
      tagline: '¡Construyamos algo juntos!',
      scrollHint: 'Mirá más',
    },
    about: {
      label: 'Acerca de',
      bio1: 'Soy Andrés, técnico en programación egresado de la UTN (Córdoba, Argentina) con honores. Trabajo como desarrollador freelance construyendo soluciones web a medida, desde plataformas de gestión hasta herramientas con IA.',
      bio2: 'Mi enfoque es iterativo: prefiero meterme de lleno, explorar y ajustar sobre la marcha. Ese proceso de prueba y error es donde encuentro los mejores resultados. Trabajo de forma autónoma, pero me mantengo cerca del cliente durante todo el proceso: al final del día, el proyecto es para él, y quiero que el resultado refleje quién es tanto como refleja quién soy yo.',
      bio3: 'Lo que más me importa en cada entrega es que se sienta fresco, creativo, visualmente cuidado, y distinto a todo lo que hice antes.',
      bio4: '¿Tenés un proyecto en mente? Me encantaría escucharlo.',
    },
    stack: {
      label: 'Stack',
    },
    projects: {
      label: 'Proyectos',
      viewDetails: 'Ver detalles',
      close: 'Cerrar',
      stack: 'Stack',
      screenshot: 'Captura',
      prevImage: 'Captura anterior',
      nextImage: 'Captura siguiente',
      inProduction: 'En producción',
      items: [
        {
          name: 'LubriBox',
          shortDescription:
            'Sitio web para un lubricentro, con calculadora de precios según el vehículo y sistema de turnos online.',
          description:
            'Sitio web para LubriBox Car Service, un lubricentro de Córdoba. Los clientes seleccionan marca, modelo y año de su auto, y el sistema calcula el precio exacto de cada servicio según los litros de aceite del motor — con un catálogo de más de 200 modelos de 17 marcas verificado para el mercado argentino. También permite sacar turno en un formulario de 3 pasos que abre WhatsApp con el mensaje prearmado y genera un link para agendarlo en Google Calendar. Incluye un panel de administrador con login protegido para gestionar servicios y categorías, con los cambios guardados en Vercel Blob.',
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
          inProduction: false,
          images: [
            '/projects/lubribox/main.png',
            '/projects/lubribox/turnos.png',
            '/projects/lubribox/adminlog.png',
            '/projects/lubribox/paneladmin.png',
          ],
        },
        {
          name: 'Sistema Academia de Tenis',
          shortDescription:
            'Plataforma de gestión para academias de tenis, con seguimiento de jugadores, ejercicios en video y planificación de entrenamientos.',
          description:
            'Plataforma privada para entrenadores de tenis que centraliza todo el trabajo diario del staff. Incluye una biblioteca de ejercicios en video organizada por categoría técnica, con indicaciones personalizadas por ejercicio. La sección de jugadores va más allá de un simple listado: cada perfil registra estilo de juego, nivel, fortalezas, correcciones técnicas y un calendario de torneos. También cuenta con planificación de entrenamientos diarios, semanales y mensuales, y un panel de administrador para gestionar qué personas del staff tienen acceso como administradores. Los jugadores, por su parte, acceden a una plataforma propia donde pueden ver su perfil, los aspectos a mejorar, su estado físico, etc.',
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
          inProduction: false,
          images: [
            '/projects/tennis-academy-system/ingreso.png',
            '/projects/tennis-academy-system/gestion.png',
            '/projects/tennis-academy-system/admin.png',
            '/projects/tennis-academy-system/biblioteca.png',
            '/projects/tennis-academy-system/jugadores.png',
            '/projects/tennis-academy-system/planificacion.png',
          ],
        },
        {
          name: 'Gastaldi Distribuciones',
          shortDescription:
            'Catálogo de productos online para una distribuidora, con contacto directo por WhatsApp y panel de administrador para gestionar stock y precios.',
          description:
            'Sitio web de catálogo para Gastaldi Distribuciones, una distribuidora que muestra sus productos con precios actualizados y disponibilidad de stock. Los clientes pueden explorar el catálogo y contactar directamente por WhatsApp para hacer sus pedidos. Incluye un panel de administrador donde el equipo puede agregar, editar y eliminar productos, actualizar precios, y marcar qué artículos están en stock o agotados — reflejando esos cambios en tiempo real tanto para el equipo interno como para los clientes que ven el catálogo.',
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          inProduction: true,
          images: [
            '/projects/gastaldi-distributions/main.png',
            '/projects/gastaldi-distributions/admin.png',
          ],
        },
        {
          name: 'BOLT. Arquitectura y Estudio de Diseño',
          shortDescription:
            'Landing/portfolio para un estudio de arquitectura y diseño, con proyectos organizados por tipo, propuesta comercial descargable y contacto vía formulario.',
          description:
            'Sitio de portfolio para BOLT, un estudio de arquitectura y diseño de Córdoba que trabaja en Argentina, Paraguay y Guatemala, en proyectos de distintas escalas: viviendas unifamiliares, comercios, edificios de departamentos, vivienda colectiva y equipamiento educativo. El sitio muestra sus proyectos y las tres modalidades de servicio que ofrecen —solo visualización, anteproyecto con imágenes, o proyecto completo con documentación para obra—, con la visualización 3D como parte central de cada presentación. Incluye descarga en PDF de la propuesta comercial y el portfolio, y un botón de contacto que redirige a un formulario de Google Forms.',
          tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          inProduction: true,
          images: ['/projects/bolt/main.png'],
        },
        {
          name: 'Calculadora ART',
          shortDescription:
            'Calculadora de indemnizaciones ART para estudios jurídicos, con las fórmulas de la Ley 24.557 según el tipo de incapacidad.',
          description:
            'Calculadora de liquidaciones ART pensada para estudios jurídicos, que aplica las fórmulas de la Ley 24.557 y 26.773 según el tipo de prestación: ILT, ILP Parcial, ILP Total, Gran Invalidez o Muerte. Calcula automáticamente la edad del trabajador, compara el resultado de la fórmula contra los pisos mínimos vigentes (editables y guardados en el navegador), y aplica el adicional del 20% en accidentes in itinere. El desglose de cada cálculo se muestra paso a paso, con resultados imprimibles en PDF. Todo el procesamiento es 100% del lado del cliente, sin backend ni envío de datos.',
          tags: ['HTML5', 'CSS3', 'JavaScript'],
          inProduction: false,
          images: ['/projects/wc-calculator/main.jpg'],
        },
      ],
    },
    contact: {
      label: 'Contacto',
      heading: '¿Trabajamos juntos?',
    },
    header: {
      menuToggle: 'Abrir menú',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
    },
  },
}
