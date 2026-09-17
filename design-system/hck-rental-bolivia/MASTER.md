# HCK Rental — Master del sistema de diseño

Este archivo sustituye la salida autogenerada anterior ("Vibrant & Block-based", Inter + Playfair, rosa #EC4899, sombras y radios de 8–16px), que **no aplica** y fue descartada.

La especificación completa y vigente está en [`/DESIGN.md`](../../DESIGN.md). Si una página necesita reglas propias, crear `design-system/pages/<pagina>.md`; esas reglas solo pueden **concretar** DESIGN.md, nunca contradecirlo.

## Resumen operativo

- Lienzo `adobe #F6EEE9` continuo · texto `ink #333` · acento único `cobre #B5452B` · `onyx #000` para lo neutro.
- Inter Tight 300/400. Display de 80–110px con interlineado de 0.88–0.91. Sin negritas ni serif.
- Botones de contorno de 1px con 14px de radio, siempre sin relleno. Imágenes y bloques con radio 0. Sin sombras.
- Contenido centrado en 1200px, bloques separados por 80px, grilla de tres columnas iguales.
- Fotografía real a sangre, luminosa. Nada generado por IA.

## Checklist antes de entregar

- [ ] Solo tokens del sistema (`adobe`, `ink`, `onyx`, `cobre`, `white`); nada de `cream`/`obsidian`/`champagne` en código nuevo.
- [ ] Un único H1 por ruta y `useDocumentMeta` con textos únicos.
- [ ] Contraste AA (texto cobre solo desde 12px; sobre foto, siempre blanco con velo).
- [ ] Objetivos táctiles ≥ 44px, foco visible, `alt` significativo.
- [ ] Sin contenido oculto por defecto a la espera de una animación.
- [ ] Probado a 375, 768, 1024 y 1440px sin scroll horizontal.
- [ ] `npm run build` sin errores.
