# Sistema de diseño — HCK Rental

**Fuente de verdad visual del sitio.** Referencia aprobada por el cliente del proyecto: [Refero · Diabla](https://styles.refero.design/style/5528d10f-2e7d-4502-aa49-7bde290e8fe2).
Se adopta **su sistema completo** (tipografía, geometría, ritmo, componentes, reglas) con **colores propios de HCK** en los mismos roles. No se copian marca, textos ni imágenes de Diabla.

Implementación: `tailwind.config.js` (tokens) · `src/index.css` (clases de sistema) · `src/components/ui/` (primitivas).

## Idea rectora

Un patio andino a mediodía: lienzo de adobe claro, una sola lona cobre y titulares ligeros que se estiran sobre el cielo. El sitio se lee como un catálogo editorial impreso: plano, silencioso y con toda la fuerza puesta en la fotografía y en la escala de la tipografía.

## Color

| Token | Hex | Rol (equivalente en la referencia) |
|---|---|---|
| `adobe` | `#F6EEE9` | Lienzo de toda la página. Nunca blanco puro. (Blush Canvas) |
| `adobe-deep` | `#EFE3DC` | Relleno de campos y fondo mientras carga una imagen: cambio tonal, sin borde. |
| `adobe-line` | `#E2D3CA` | Filetes de 1px (listas, pie). |
| `ink` | `#333333` | Texto de lectura. Nunca negro puro. (Charcoal Ink) — 11:1 sobre adobe |
| `ink-soft` | `#5C5550` | Texto secundario, pies de foto. — 6.4:1 |
| `onyx` | `#000000` | Borde y texto del botón neutro; base del velo del hero. (Onyx) |
| `cobre` | `#B5452B` | **Único acento**: marca, navegación, bordes de botón, titulares editoriales, etiquetas. — 4.76:1 (AA) (Vermillion) |
| `cobre-light` | `#E8A48F` | Solo sobre fotografía oscura (flecha del hero). |
| `white` | `#FFFFFF` | Solo texto y botones sobre fotografía. |

Reglas: el cobre se raciona — jamás rellena superficies grandes. Sin segundo acento, sin degradados, sin verde WhatsApp. El lienzo es continuo: **no se alternan bandas oscuras y claras**, el pie también va sobre adobe.

## Tipografía

Una sola familia: **Inter Tight** (sustituto web de Helvetica Neue), pesos 300 y 400. Sin negritas ni seminegritas: la jerarquía sale del tamaño y del color. Sin serif en ninguna parte.

| Clase/token | Tamaño | Interlineado | Uso |
|---|---|---|---|
| `type-display-xl` | 52→110px | 0.88 | H1 del hero. Peso 300, `-0.02em`. |
| `type-display` | 48→80px | 0.91 | Titular de cierre/CTA, menú móvil. Peso 300. |
| `text-heading` | 26→33px | 1.13 | H2 de sección (300, cobre) y frases de introducción (300, ink). |
| `text-subhead-lg` | 22px | 1.29 | Listas tipográficas (experiencia), teléfono. |
| `text-subheading` | 18px | 1.3 | Titulares de pieza editorial (MAYÚSCULAS), marca en la nav, metadatos del hero. |
| `text-body-lg` | 16px | 1.5 | Párrafos. Máx. 62ch. |
| `text-body` | 14px | 1.5 | Texto de piezas editoriales, pie. |
| `type-label` | 12px | 1.3 | MAYÚSCULAS: nav, botones, etiqueta de pieza. |
| `text-caption` | 10px | 1.2 | Pies de foto y legales, en mayúsculas. |

El interlineado comprimido del display es la firma del sistema: no abrirlo.

## Geometría y espacio

- Base 4px. Separación entre bloques: **80px** (`mt-section`). Columna de contenido **1200px** (`max-w-page`), margen lateral 16px móvil / 24px.
- Radios: **0** en imágenes, bloques e inputs; **14px** solo en botones (`rounded-button`).
- Sin sombras, sin elevación, sin tarjetas con fondo o borde. Todo "impreso sobre papel".
- El contenido siempre va **centrado**; nada de composiciones asimétricas en z ni bentos.

## Componentes

- **Navegación** (`Navbar.jsx`): grupos a izquierda y derecha, marca "HCK Rental" al centro. Transparente y blanca sobre el hero; cobre sobre adobe en páginas internas. No fija. Móvil: "Menú · HCK Rental · WhatsApp" y un panel a pantalla completa con los enlaces en `type-display`.
- **Botón** (`.btn` + `.btn-cobre` | `.btn-ink` | `.btn-light`): contorno de 1px, fondo transparente, 14px de radio, MAYÚSCULAS de 12px, altura mínima de 44px. **Nunca se rellena** en reposo. Jerarquía: un botón de contorno + un enlace de texto, nunca dos botones iguales juntos.
- **Hero** (`Hero.jsx`): foto o video a sangre a 100svh, velo plano `onyx/40`, parallax al hacer scroll, etiqueta → H1 blanco centrado → metadatos → CTA, flecha cobre abajo. El video solo se reproduce sin `prefers-reduced-motion` ni `saveData`.
- **Pieza editorial** (`EditorialItem.jsx`): imagen 4:5 → etiqueta cobre → titular en MAYÚSCULAS → texto → botón de contorno opcional. Siempre en **grilla de tres columnas iguales**; nunca en masonry.
- **Banda fotográfica**: imagen a todo el ancho de la ventana con pie de foto en `text-caption`.
- **Bloque de perfil/método**: imagen horizontal (monocroma permitida) sobre dos columnas de texto.
- **Lista tipográfica**: nombres en `text-subhead-lg` centrados; nunca logotipos sin autorización.
- **Campo de formulario** (`.field`): fondo `adobe-deep`, sin borde, radio 0, etiqueta en `type-label` arriba; foco y error con filete cobre inferior de 2px.
- **Enlace**: cobre, subrayado solo en hover/foco (`.link-cobre`).
- **WhatsApp flotante**: pastilla `.btn-cobre` sobre adobe; aparece tras la primera pantalla y no se muestra en Contacto.
- **Botón silencioso** (`.btn-quiet`): contorno `adobe-line`, para filtros, índices y opciones. Seleccionado = `.btn-cobre` sin relleno.

## Etiquetas en mayúsculas (uso racionado)

Solo en: nav, botones, etiqueta del hero, etiqueta de cada pieza editorial y como encabezado de listas tipográficas. **No** se pone una etiqueta sobre cada H2. La numeración solo aparece en secuencias reales (método de trabajo).

## Fotografía

- Luz alta, diurna o de atardecer suave; tonos cálidos y algo desaturados. Montajes amplios, materiales (lona, acero, madera), paisaje andino. Presencia humana mínima y nunca posada.
- A sangre, sin bordes redondeados, marcos, sombras ni filtros (la monocromía queda permitida solo en el bloque de método).
- **Prohibido**: imágenes generadas por IA, stock de bodas con parejas posando, escenas nocturnas oscuras como imagen principal.
- Todas las imágenes pasan por `src/content/media.js` con `alt`, dimensiones y `status` (`maqueta` | `hck`).

## Movimiento

Suave, lento y con peso: el sitio "respira" al desplazarse, pero nada se mueve solo salvo los videos. Curva única `--ease-soft` (`cubic-bezier(0.16, 1, 0.3, 1)`), sin rebotes. Todo se desactiva con `prefers-reduced-motion`.

| Capa | Implementación | Comportamiento |
|---|---|---|
| Scroll | `MotionProvider` + Lenis | Desplazamiento suave (1.15s, ease-out-quart). Anclas y cambio de ruta también. |
| Revelado de texto | clase `.reveal` | Opacidad + 36px + desenfoque de 6px → nítido, 1.1–1.3s. Escalonar con `style={{ '--i': n }}` (110ms por paso). |
| Revelado de imagen | clase `.reveal-media` en el contenedor | Cortina `clip-path` desde abajo + la imagen pasa de escala 1.12 a 1, 1.5–1.8s. |
| Parallax | `<Parallax>`, `PhotoBand`, `VideoBand`, `Hero` | La imagen se desplaza más lento que la página (±7%). En el hero, el texto sube y se desvanece al salir. |
| Entrada del hero y cabeceras | clase `.hero-enter` con `--i` | Secuencia etiqueta → H1 → metadatos → acciones al cargar. |
| Botones | `.btn` | El relleno sube desde el borde inferior (550ms) y la flecha avanza 3px; al presionar, escala 0.97. En reposo, siempre de contorno. |
| Enlaces | `.link-draw`, `.link-cobre` | El subrayado se dibuja de izquierda a derecha. |
| Imágenes con hover | `.media-hover` dentro de `.group` | Zoom de 1.04 en 1.4s; el titular de la pieza pasa a cobre. |
| Rutas | `PageTransition` | Fundido con 14px de desplazamiento. |
| Menú móvil / filtros | Framer Motion | Cortina `clip-path`; enlaces escalonados con desenfoque; reordenamiento `layout` en la galería. |

Reglas: el contenido es visible si no hay JS o movimiento (`html[data-motion="on"]` activa los estados iniciales). No animar propiedades de layout. No añadir movimientos en bucle ni efectos que no tengan una de estas funciones.

## Antipatrones (rechazar y reescribir)

- Serif, cursivas decorativas, negritas.
- Botones rellenos, verde WhatsApp, sombras, glassmorphism, degradados, texto con degradado.
- Secciones oscuras alternadas, bentos, tarjetas con icono + título + texto, grillas asimétricas.
- Etiqueta en mayúsculas + número sobre cada sección.
- Métricas grandes ("+500 eventos") o superlativos sin validación del cliente.
- Oro, champagne, "lujo" de salón de bodas.
- Crema/marfil genérico como lienzo: el lienzo es adobe, teñido hacia el cobre.

## Estructura de página

**Inicio**: Hero → frase de introducción → Lo que montamos (3) → banda fotográfica → Montajes recientes (3, datos) → Experiencia (lista tipográfica) → Cómo trabajamos (imagen + 2 columnas) → Cotizar (display + 2 acciones) → Pie.

**Servicios**: `PageHeader` → índice de anclas → por servicio: imagen 21:9 + dos columnas (descripción / incluye + CTA) → tipos de evento → Cotizar.

**Galería**: `PageHeader` → filtros de contorno → grilla de tres (`EditorialItem` con `onOpen`) → lightbox → Cotizar.

**Nosotros**: `PageHeader` → `PhotoBand` → quiénes somos (2 columnas) → principios (4 columnas) → Experiencia → Método → Cotizar.

**Contacto**: `PageHeader` → formulario (compone el mensaje y abre WhatsApp) + columna de contacto directo.

Toda página interna usa `PageHeader` (H1 display cobre centrado, sin foto) y `useDocumentMeta` con título y descripción únicos.
