# HCK Rental — guía de trabajo persistente

Este archivo es el punto de entrada para cualquier sesión o agente que trabaje en este repositorio. Antes de modificar la interfaz, leer `PRODUCT.md` y `DESIGN.md` (el resumen operativo está en `design-system/hck-rental-bolivia/MASTER.md`).

## Contexto del producto

- HCK Rental by VIP Planners produce y resuelve la infraestructura de eventos en Bolivia: carpas, estructuras, pistas de baile, tarimas, soportes y logística integral.
- Atiende bodas, eventos corporativos, institucionales, fiestas de fin de año y eventos grandes o medianos. La Paz es una plaza clave, con cobertura nacional.
- La meta del sitio es generar consultas cualificadas por WhatsApp y formulario, reforzando una percepción de solvencia, precisión y exclusividad.

## Diseño y experiencia

- **`DESIGN.md` es la fuente de verdad visual** (sistema de la referencia Refero/Diabla con colores HCK). Cualquier cambio de UI debe cumplirlo; si algo no está cubierto, ampliar DESIGN.md antes de inventar un patrón nuevo.
- Skills: `impeccable` y `ui-ux-pro-max` (globales del entorno) y `frontend-design`, `vercel-react-best-practices` (en `.agents/skills/`, enlazadas en `.claude/skills/`). Cuando sus recomendaciones genéricas contradigan DESIGN.md (p. ej. límite de tamaño del display, fuentes "distintivas", paletas), **prevalece DESIGN.md**.
- `caveman` y `caveman-commit` (en `.agents/skills/`) solo se usan si el usuario pide explícitamente ese modo.
- Primitivas en `src/components/ui/` (`Container`, `Photo`, `PhotoBand`, `VideoBand`, `EditorialItem`, `Icons`), secciones en `src/components/` (`Hero`, `PageHeader`, `QuoteBlock`, `ExperienceList`, `MethodBlock`) y clases `.btn*`, `.type-*`, `.field`, `.reveal*`, `.link-*` en `src/index.css`. Reutilizarlas.
- Tokens: `adobe`, `ink`, `onyx`, `cobre`. No hay tokens heredados: cualquier color fuera de ellos es un error.
- Fotografía: solo real (licencia libre como maqueta, obra de HCK como definitiva). Nunca imágenes generadas por IA.
- Mantener accesibilidad WCAG AA: foco visible, controles de 44 px mínimos, etiquetas explícitas en formularios, textos alternativos significativos y `prefers-reduced-motion`.

## Contenido

- Datos de negocio: `src/content/site.js`. Servicios: `src/content/services.js`. Proyectos y categorías de galería: `src/content/projects.js`. Medios: `src/content/media.js` (único lugar con rutas de archivo).
- No publicar cifras, capacidades, años ni clientes que no estén confirmados (`verify` / `placeholder: true`).
- **Agregar un evento** (lo mantiene el equipo, sin CMS):
  1. Convertir fotos: `cwebp -q 78 -resize 1200 0 foto.jpg -o public/media/proyectos/<slug>/01-1200.webp` (y `-resize 640` para la versión chica).
  2. Registrar cada foto en `media.js` con `alt` descriptivo y `status: 'hck'`.
  3. Agregar la entrada al inicio de `projects` en `projects.js` (sin `placeholder`). Los tres primeros aparecen en Inicio.
  4. `npm run build`, commit y push: Coolify despliega.
- Video: MP4 H.264 sin audio, ≤ 1280px, ≤ 3 MB (`ffmpeg -i in.mp4 -t 14 -an -vf scale=1280:-2 -c:v libx264 -crf 30 -movflags +faststart out.mp4`) + póster WebP.

## Tecnología, despliegue y verificación

- Stack: React 18 + Vite + Tailwind + Framer Motion + Lenis. Evitar dependencias nuevas salvo que aporten una mejora clara.
- Movimiento: ver DESIGN.md › Movimiento. Los bloques nuevos usan `.reveal` / `.reveal-media` en vez de lógica de animación propia.
- Desarrollo: `npm run dev -- --host 127.0.0.1 --port 5180`.
- Despliegue: **Coolify** con el `Dockerfile` de la raíz (build Node 22 → nginx 1.27). Puerto 80, health check en `/healthz`, configuración en `docker/`.
- Variables de build (Coolify › Environment Variables, marcar **Build Variable**): `VITE_SITE_URL` (hoy `https://hckrental.spestanam.com`, luego `https://hckrental.com`), `VITE_GA_ID` (opcional), `VITE_GSC_VERIFICATION` (opcional).
- SEO: `npm run build` compila, prerenderiza cada ruta (`src/entry-server.jsx` + `scripts/prerender.mjs`) y genera `404.html`, `sitemap.xml` y `robots.txt` con el dominio de `VITE_SITE_URL`. Título y descripción de cada ruta viven solo en `src/content/seo.js`; una ruta nueva se agrega en `App.jsx` **y** en `seo.js`.
- Archivos estáticos sueltos (verificación de Google, `og-image.jpg`, etc.) van en `public/`: se publican en la raíz del dominio.
- Código que corre en el prerender no puede tocar `window`/`document` fuera de efectos.
- Antes de cerrar cambios de interfaz: `npm run build` y capturas con Playwright a 390 y 1440 px de todas las rutas.
- Imágenes en WebP con `srcset`, dimensiones reservadas y carga diferida fuera del hero.

## SEO y conversión

- Todo contenido debe describir con precisión servicios de infraestructura y producción de eventos en Bolivia, evitando keyword stuffing.
- Cada ruta debe tener título, meta descripción, un único H1, texto alternativo y enlaces internos útiles. Preparar datos estructurados `LocalBusiness`/`EventService` al implementar SEO.
- Mantener CTA visibles hacia WhatsApp y formulario de cotización. WhatsApp principal confirmado: `+591 77797997`.
