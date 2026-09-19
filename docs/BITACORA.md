# Bitácora del proyecto HCK Rental

Qué se hizo, por qué y qué salió mal. El método destilado está en [`PLAYBOOK.md`](../PLAYBOOK.md); aquí quedan los
detalles y las trampas concretas, con nombre y causa, para no repetirlas.

Periodo: septiembre de 2026. Estado: sitio en producción en `hckrental.spestanam.com` (Coolify), propuesta comercial entregada.

---

## 1. Punto de partida

Otro agente (Codex) había empezado una migración a partir de un design file nuevo —el estilo
[Refero/Diabla](https://styles.refero.design/style/5528d10f-2e7d-4502-aa49-7bde290e8fe2)— y la dejó a medias: solo el hero.
El resto del sitio conservaba el diseño anterior y, peor, **contenido de otro negocio** (decoración floral, quinceaños)
heredado de una plantilla.

Al revisar su trabajo aparecieron tres clases de problema:

- **Desvío del design file.** Serif en titulares, secciones oscuras alternadas, CTA relleno, collage de fotos con
  degradados: nada de eso estaba en la referencia, que pide una grotesca de un solo peso, lienzo continuo y botones de contorno.
- **Errores funcionales.** El subtítulo del hero era invisible porque usaba clases de opacidad que Tailwind no genera
  (`text-cream-100/78`); el bloque final de cotización se publicaba en blanco porque la animación de entrada ocultaba el
  contenido y nunca se disparaba.
- **Imágenes generadas por IA** y un `MASTER.md` autogenerado con un sistema ajeno (rosa #EC4899, Inter + Playfair, sombras).

**Aprendizaje:** el trabajo heredado se verifica contra la fuente original del diseño, no contra sí mismo. Y las
contradicciones se resuelven preguntando al cliente: se plantearon tres decisiones (sistema, paleta, medios) y las tres
respuestas cambiaron el resultado.

## 2. Sistema de diseño

Se adoptó el sistema completo de la referencia con **colores propios**: lienzo `adobe #F6EEE9` teñido hacia el acento,
`cobre #B5452B` como único acento, `ink #333` para texto, Inter Tight en pesos 300 y 400, botones de contorno con 14 px
de radio, lienzo continuo sin bandas oscuras.

- El contraste se calculó antes de fijar la paleta: `cobre` sobre `adobe` da 4.76:1, suficiente para texto pequeño.
- Se rechazó el crema/marfil genérico como lienzo: es el reflejo por defecto de cualquier IA. Teñirlo hacia el hue del
  acento lo vuelve de la marca.
- Las skills genéricas (`impeccable`, `frontend-design`) recomendaban cosas que contradecían el design file (techo de
  tamaño para el display, "evita Inter", etc.). Se documentó en `AGENTS.md` que **prevalece `DESIGN.md`**.
- Los tokens viejos (`cream`, `obsidian`, `champagne`) se mantuvieron como legado mientras quedaban páginas sin migrar y
  se eliminaron el mismo día en que la última página pasó al sistema nuevo.

## 3. Contenido y medios

- Se separó el contenido del código en `src/content/` (negocio, servicios, proyectos, medios, SEO) y se borró `src/data/`,
  que describía otro rubro.
- Una investigación de la presencia pública de HCK encontró **solo** su Instagram (`@hck_rental`, "HCK Rental by
  Vipplanners Srl."). No hay dirección, año de fundación ni catálogo publicados. Todo lo no confirmado quedó marcado en
  el código y fuera de las afirmaciones del sitio.
- Las cuatro imágenes de IA se reemplazaron por fotografía real de licencia libre (Unsplash/Pexels), convertida a WebP
  responsivo, más un video de 2 MB para la banda central. Se descartaron fotos con banderas extranjeras o con la
  interfaz del propio sitio dentro; a una se le recortaron las banderas.
- El cliente aportó una palabra clave de su vocabulario, **"toldos arquitectónicos"**, que se incorporó a servicios,
  titulares y metadatos. Ese tipo de término vale más que cualquier investigación de palabras clave genérica.

## 4. Movimiento

Primera versión con `animation-timeline: view()` (CSS puro): elegante, pero **Safari no lo soporta**, así que en iPhone no
pasaba nada. Se reemplazó por un `IntersectionObserver` global sobre `.reveal` / `.reveal-media`, con Lenis para el scroll
suave y Framer Motion para parallax, menú y transiciones de ruta.

Trampas encontradas:

- **Contenido gateado por animación.** Si el estado inicial se esconde siempre, un fallo del observador publica la sección
  en blanco (ya había pasado con el trabajo heredado). Solución: el estado inicial solo existe bajo
  `html[data-motion="on"]`, atributo que pone un script en línea en el `<head>`; sin JavaScript, todo visible.
- **Zoom de entrada = scroll horizontal.** El `scale(1.12)` inicial de las imágenes desbordaba las bandas a todo el ancho:
  el documento medía 413 px en una pantalla de 390. Se corrigió con `overflow: hidden` en el contenedor y
  `overflow-x: clip` en `html`.

## 5. Prerenderizado y SEO

`npm run build` compila el cliente, compila un bundle SSR (`src/entry-server.jsx`) y ejecuta `scripts/prerender.mjs`, que
escribe un HTML completo por ruta, `404.html`, `sitemap.xml` y `robots.txt` con el dominio de `VITE_SITE_URL`.

Detalles que costaron tiempo:

- `useState(() => window.matchMedia(...))` **rompe el SSR**: hay que guardar con `typeof window !== 'undefined'`.
- React 18 no reconoce `fetchPriority` en camelCase; el atributo va en minúsculas (`fetchpriority`).
- La hidratación necesita distinguir el HTML prerenderizado del root vacío de desarrollo: `container.firstElementChild`
  (no `hasChildNodes`, porque el comentario marcador cuenta como nodo).
- `AnimatePresence` con `initial={false}` evita que la transición de ruta deje el HTML prerenderizado invisible.

## 6. Despliegue en Coolify

Dos etapas (Node 22 → nginx 1.27), puerto 80, health check en `/healthz`, encabezados de seguridad y caché por tipo de archivo.

- **502 del proxy.** El DNS y el TLS estaban bien; el proxy no alcanzaba el contenedor. Causa: "Ports Exposes" en Coolify
  viene en **3000** por defecto. Ahora nginx escucha en 80 **y** 3000, y el problema no puede repetirse.
- **`add_header` no se hereda.** Los encabezados definidos en `server` desaparecen en cuanto una `location` define los
  suyos. Se repiten con `include` en cada `location`.
- **Soft 404.** El `try_files ... /index.html` clásico devuelve 200 a cualquier URL. Se cambió a
  `try_files $uri $uri/index.html =404` con `error_page 404 /404.html`, y las URLs con barra final redirigen a la versión sin barra.
- La imagen se probó con `docker buildx --platform linux/amd64` desde un Mac ARM antes de dar por bueno el despliegue.

## 7. iPhone con isla dinámica

El cliente reportó una franja clara arriba y un borde blanco a la derecha.

- La franja: faltaba `viewport-fit=cover`. Sin eso, Safari deja la página dentro del área segura y pinta el resto con el
  color de fondo. Se añadió, junto con utilidades `.safe-x` / `.safe-top` / `.safe-bottom` basadas en `env(safe-area-inset-*)`
  para navegación, menú, hero, contenedores, pie y botón flotante.
- El borde: el scroll horizontal del punto 4.
- **Limitación:** el navegador de pruebas reporta las áreas seguras en cero, así que esa parte la confirma el cliente en
  su teléfono. Conviene decirlo en lugar de dar por verificado lo que no se pudo medir.

## 8. Verificación

Scripts de Playwright en el directorio temporal de la sesión (no en el repositorio) que recorren todas las rutas a 390 y
1440 px y reportan título, número de `h1`, scroll horizontal, elementos revelados pendientes, errores de consola y `alt`
faltantes; más capturas por ruta, prueba sin JavaScript y un recorrido con clics (anclas, filtros, lightbox, menú, formulario).

Un tropiezo menor: tras instalar una dependencia nueva, el servidor de desarrollo servía dependencias en caché y devolvía
504 en todo. Reiniciar con `--force` tras borrar `node_modules/.vite`.

## 9. Propuesta comercial

Investigación del mercado boliviano (septiembre de 2026), con fuentes citadas, para fijar el precio:

- Sitio informativo de agencia boliviana: **Bs 990 – 2.690**; el tarifario gremial 2025 marca **USD 1.800**.
- **Mantenimiento: USD 80 – 200 al mes** (guía BigRedes, enero 2026). Solo el hosting local: Bs 470 – 1.618 al año.
- El gancho universal del mercado es "dominio y hosting gratis el primer año", con la factura llegando el mes 13.
  Seis proveedores revisados **no publican precios** y obligan a escribir por WhatsApp.
- **Tipo de cambio:** Bolivia abandonó el 6,96 fijo en junio de 2026. El oficial se movió de 12,64 a 9,83 en ocho días
  durante septiembre. Conclusión: cotizar en USD y, si se muestran bolivianos, fijar la fecha del cambio en el documento.

Oferta resultante: **USD 100 de pago único + USD 39 al año** con actualizaciones ilimitadas, dominio a nombre del cliente
y sin permanencia. El argumento de venta no es el precio de entrada sino el recurrente: 25 veces menos que el
mantenimiento de una agencia. El margen anual real es de unos USD 28 tras el dominio `.com` (USD 11,15 desde noviembre de 2026),
sostenible **porque el sitio es estático**; con WordPress gestionado no lo sería.

El folleto (6 páginas A4) se generó como HTML con el sistema de diseño del propio cliente y se imprimió a PDF con Chrome.
Fuentes de la investigación y archivos en `~/Desktop/HCK-Propuesta/`.

---

## Resumen de trampas, por si hay prisa

| Síntoma | Causa real |
|---|---|
| Texto invisible en un bloque | Clase de opacidad arbitraria que Tailwind no genera (`/78`) |
| Sección publicada en blanco | Visibilidad del contenido condicionada a una animación |
| Borde blanco lateral en móvil | Zoom de entrada sin recorte → scroll horizontal |
| Franja del color de fondo en iPhone | Falta `viewport-fit=cover` + `env(safe-area-inset-*)` |
| Animaciones que no ocurren en iPhone | `animation-timeline: view()` no soportado en Safari |
| 502 en Coolify | "Ports Exposes" en 3000 y nginx escuchando solo en 80 |
| Encabezados de seguridad ausentes | `add_header` no se hereda cuando la `location` define los suyos |
| Vista previa equivocada al compartir un enlace | SPA sin prerenderizado: las redes no ejecutan JavaScript |
| "Soft 404" en Search Console | El servidor responde 200 a rutas inexistentes |
| Error de SSR al compilar | `window` usado fuera de un efecto (inicializador de `useState`) |
| 504 en todo el servidor de desarrollo | Caché de dependencias de Vite tras instalar un paquete |
