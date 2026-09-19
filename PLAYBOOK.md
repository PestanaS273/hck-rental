# Playbook — sitio a medida a partir de un design file

Método reutilizable, extraído de la construcción de HCK Rental. Sirve para el siguiente proyecto aunque el estilo sea
completamente distinto: cambia el design file, no el procedimiento.

**Entrada:** un design file (enlace de referencia tipo Refero, Figma, PDF de marca o capturas) + el negocio del cliente.
**Salida:** sitio estático prerenderizado, con movimiento propio, SEO listo, desplegado en Coolify y mantenido por nosotros.

---

## Fase 0 · Antes de escribir una línea

1. **Extraer la especificación completa del design file**, no un resumen: paleta con roles, familias y escala tipográfica,
   interlineados, escala de espaciado, radios, sombras (o su ausencia), componentes, tratamiento fotográfico, do's y don'ts.
   De un enlace de referencia se saca con una sola petición pidiendo "verbatim y exhaustivo, sin resumir".
2. **Detectar los conflictos antes de programar.** Casi siempre hay tres:
   - el design file contra lo que ya escribió otro agente o desarrollador;
   - el design file contra las skills genéricas de diseño (límites de tamaño, "usa fuentes distintivas", paletas);
   - el design file contra el posicionamiento del cliente (una paleta que no le pertenece).
   Resolver **preguntando al cliente**, no eligiendo en silencio. Tres preguntas bastan: sistema (fiel o híbrido),
   paleta (literal o mismos roles con colores propios), y medios (tiene fotos reales o trabajamos con maqueta).
3. **Regla de oro:** el design file manda. Las skills genéricas ceden, y eso se deja escrito en `AGENTS.md` para que
   ningún agente futuro lo "mejore" por su cuenta.

## Fase 1 · Traducir el design a tokens

- `tailwind.config.js` contiene **solo** los tokens del sistema. Nada de escalas heredadas ni colores sueltos.
  Si aparece un color fuera de los tokens, es un error, no una excepción.
- `src/index.css` contiene las clases de sistema (`.btn*`, `.type-*`, `.field`, `.link-*`, `.reveal*`). Los componentes
  no inventan estilo: lo componen.
- **Verificar el contraste antes de adoptar la paleta**, no después. Un script de 10 líneas calcula el ratio WCAG de cada
  par texto/fondo; el acento sobre el lienzo debe llegar a 4.5:1 si se usa en texto pequeño.
- Cuidado con el lienzo crema o marfil "elegante": es el reflejo por defecto de cualquier IA. Si el sistema pide un lienzo
  claro y cálido, tíñelo hacia el **hue del acento de la marca** para que sea de ella y no de nadie.
- Migrar por fases es legítimo: se pueden mantener tokens heredados marcados como legado mientras quedan páginas viejas,
  pero **hay que borrarlos** en cuanto la última página migra. Si no, vuelven.

## Fase 2 · Primitivas antes que páginas

Este conjunto se repitió en todas las páginas y conviene crearlo de entrada:

| Primitiva | Qué resuelve |
|---|---|
| `Container` | Ancho de columna, márgenes laterales y áreas seguras. |
| `Photo` | `srcSet`, dimensiones reservadas, `alt`, `loading`, `object-position`. |
| `PhotoBand` / `VideoBand` | Medios a sangre con parallax y pie de foto. |
| `EditorialItem` | La pieza repetida de la grilla (imagen, etiqueta, titular, texto, acción). |
| `PageHeader` | Cabecera de página interna, sin foto. |
| `QuoteBlock` | Cierre de conversión compartido por todas las páginas. |
| `Icons` | SVG propios; nunca emojis ni librerías de iconos enteras. |

Las páginas quedan entonces cortas y legibles, y un cambio de sistema se hace en un solo sitio.

## Fase 3 · Contenido fuera del código

`src/content/` con un archivo por tipo: negocio, servicios, proyectos, medios y SEO.

- **`media.js` es el único lugar del proyecto con rutas de archivo.** Cada imagen lleva `alt`, dimensiones, crédito y un
  `status` (`maqueta` | cliente). Cambiar una foto es editar una línea.
- Nada de datos inventados. Lo que el cliente no confirmó se marca (`verify`, `placeholder: true`) y el sitio lo muestra
  de forma honesta o no lo muestra.
- Este es también el flujo de mantenimiento: publicar un evento nuevo = convertir fotos, registrarlas y añadir una entrada.

## Fase 4 · Medios

- Fotografía real siempre. **Nunca imágenes generadas por IA**: se notan y hunden la credibilidad del cliente.
- Para maquetas, Unsplash y Pexels permiten uso comercial. Buscar con criterios de composición (dónde va el texto,
  qué debe leerse a primera vista), verlas todas y descartar sin pena. Recortar para eliminar banderas, marcas o texto ajeno.
- Recetas:
  ```bash
  cwebp -q 78 -resize 1200 0 foto.jpg -o public/media/.../foto-1200.webp   # + 640 para móvil
  ffmpeg -i in.mp4 -t 14 -an -vf scale=1280:-2 -c:v libx264 -crf 30 -movflags +faststart out.mp4
  ```
- Hero: precargar con `imagesrcset` y `fetchpriority="high"`. Video: mudo, en bucle, con póster, y solo si el usuario no
  pidió menos movimiento ni está ahorrando datos.
- Generar siempre un `og-image.jpg` de 1200×630: las vistas previas de WhatsApp y Facebook son la mitad de la primera impresión.

## Fase 5 · Movimiento

Tres capas, una sola curva de salida, todo anulable con `prefers-reduced-motion`:

1. **Scroll suave** (Lenis) con un proveedor que también expone la instancia para detener el scroll al abrir un menú.
2. **Revelado al entrar en pantalla**: un `IntersectionObserver` global marca los elementos `.reveal` / `.reveal-media`.
   El CSS solo esconde el estado inicial cuando `html[data-motion="on"]`, y ese atributo lo pone un script en línea en el
   `<head>`. Así **el contenido es visible si el JavaScript no corre**, y no hay parpadeo al hidratar.
3. **Parallax** en medios a sangre y en el hero, con Framer Motion.

Reglas aprendidas a golpes:
- Nunca condicionar la visibilidad del contenido a una animación: si el observador no dispara, la sección se publica en blanco.
- Un zoom de entrada en una imagen **produce scroll horizontal** si el contenedor no recorta. `overflow: hidden` en el
  contenedor y `overflow-x: clip` en `html`.
- `animation-timeline: view()` es elegante pero Safari no lo soporta; el observador sí funciona en todos.

## Fase 6 · SEO en un sitio estático

- **Una sola fuente de metadatos por ruta** (`src/content/seo.js`), usada por el hook del navegador y por el prerender.
  Ruta nueva = añadirla al router **y** a ese archivo.
- **Prerenderizado**: `vite build` + `vite build --ssr` + un script que renderiza cada ruta a HTML completo e inyecta
  título, descripción, canonical, Open Graph y JSON-LD; además genera `404.html`, `sitemap.xml` y `robots.txt`.
  Sin esto, WhatsApp y Facebook muestran siempre la vista previa del inicio.
- **El dominio va en una variable de build** (`VITE_SITE_URL`). Cambiar de dominio es cambiar la variable y redesplegar.
- El código que corre en el prerender no puede tocar `window` ni `document` fuera de efectos.
- El servidor debe devolver **404 reales**; un SPA que responde 200 a todo genera "soft 404" en Search Console.
- Verificar Search Console por DNS (sobrevive a cualquier cambio de hosting) y dejar preparada la variable de GA4.

## Fase 7 · Despliegue (Coolify)

`Dockerfile` de dos etapas: Node para compilar, nginx para servir.

- **Escuchar en 80 y 3000.** El valor por defecto de "Ports Exposes" en Coolify es 3000, y si no coincide el proxy
  devuelve 502 sin más pistas.
- `nginx -t` y una comprobación de que el build generó lo esperado, dentro de la imagen: un fallo silencioso publica un sitio vacío.
- **`add_header` no se hereda**: si una `location` define uno, pierde los del bloque `server`. Los encabezados de seguridad
  se repiten con un `include` en cada `location`.
- Caché: assets con hash inmutables, medios una semana, HTML sin caché.
- `curl` dentro de la imagen y un `HEALTHCHECK` propio.
- Probar la imagen **para `linux/amd64`** desde un Mac ARM (`docker buildx --platform linux/amd64`) antes de dar por bueno el despliegue.

## Fase 8 · Verificación (no se cierra sin esto)

Un script de Playwright que recorre todas las rutas a 390 y 1440 px y reporta:
`title`, número de `h1`, scroll horizontal, elementos `.reveal` que quedaron ocultos, errores de consola y `alt` faltantes.
Además: capturas de cada ruta para revisarlas de verdad, prueba sin JavaScript, y un recorrido con clics de los
elementos interactivos (anclas, filtros, lightbox, menú móvil, formulario).

En móvil real (iPhone con isla dinámica):
- `viewport-fit=cover` y `env(safe-area-inset-*)` en todo lo que toca los bordes; sin eso aparece una franja del color de fondo.
- Los emuladores reportan las áreas seguras en cero: esa parte la confirma el cliente en su teléfono.

## Fase 9 · La propuesta comercial

El mismo sistema de diseño del sitio sirve para el folleto: se ven como una sola cosa y demuestra el trabajo.

- HTML con `@page { size: A4; margin: 0 }` y páginas de 210×297 mm → PDF con Chrome (`page.pdf`, `preferCSSPageSize`).
- Seis páginas: portada, prueba de que ya existe, qué incluye, cómo funciona, inversión y cierre con contacto.
- Anclar el precio recurrente contra el gasto real del mercado, citando fuentes y fecha.
- Nunca inventar testimonios, cifras de clientes ni quejas del mercado que no estén documentadas.
- Rasterizar el PDF (`pdftoppm`) y revisar página por página: los recortes y desbordes solo se ven así.

---

## Comprobación anti-slop (antes de entregar)

- [ ] ¿Se adivina el rubro por la paleta y la tipografía? Entonces es el reflejo por defecto: rehacer.
- [ ] Nada de etiquetas en mayúsculas ni numeritos `01/02/03` sobre cada sección; los números solo en secuencias reales.
- [ ] Sin tarjetas con icono + título + texto repetidas, sin degradados decorativos, sin sombras por defecto.
- [ ] Una sola familia tipográfica bien usada vale más que dos mal emparejadas.
- [ ] Contraste AA verificado, foco visible, objetivos de 44 px, `alt` con significado.
- [ ] El contenido se lee sin JavaScript y sin animaciones.
- [ ] Ninguna afirmación que el cliente no pueda sostener.
