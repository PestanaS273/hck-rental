/**
 * sync-cloudinary.mjs
 *
 * Reads images from Cloudinary folders and generates src/data/gallery.js
 * Run automatically before build: "npm run build"
 *
 * Folder structure in Cloudinary:
 *   hck-rental/bodas/
 *   hck-rental/cumpleanos/
 *   hck-rental/embajadas/
 *   hck-rental/graduaciones/
 *   hck-rental/quinceanos/
 *   hck-rental/corporativos/
 */

import { v2 as cloudinary } from 'cloudinary'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Config ──────────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const API_KEY    = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET
const ROOT_FOLDER = 'hck-rental'

const CATEGORIES = [
  { id: 'bodas',        label: 'Bodas',         title: 'Boda' },
  { id: 'cumpleanos',   label: 'Cumpleaños',     title: 'Celebración' },
  { id: 'embajadas',    label: 'Embajadas',      title: 'Evento Oficial' },
  { id: 'graduaciones', label: 'Graduaciones',   title: 'Graduación' },
  { id: 'quinceanos',   label: 'Quinceaños',     title: 'Quinceaños' },
  { id: 'corporativos', label: 'Corporativos',   title: 'Evento Corporativo' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildUrl(publicId, options = {}) {
  const { width = 1200, quality = 85, format = 'auto' } = options
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_${format},q_${quality},w_${width}/${publicId}`
}

async function fetchFolder(folderId) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: `${ROOT_FOLDER}/${folderId}/`,
      max_results: 100,
      resource_type: 'image',
    })
    return result.resources || []
  } catch (err) {
    console.warn(`  ⚠ Carpeta "${folderId}" vacía o no encontrada`)
    return []
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // If no env vars, write placeholder file and exit gracefully
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.log('⚠  Variables de Cloudinary no encontradas — usando galería de ejemplo')
    writeFallback()
    return
  }

  cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET })

  console.log('☁  Sincronizando galería desde Cloudinary...\n')

  const allItems = []
  let id = 1

  for (const cat of CATEGORIES) {
    const resources = await fetchFolder(cat.id)
    console.log(`  ✓ ${cat.label}: ${resources.length} imagen${resources.length !== 1 ? 'es' : ''}`)

    for (const resource of resources) {
      allItems.push({
        id: id++,
        src:      buildUrl(resource.public_id, { width: 1600, quality: 85 }),
        thumb:    buildUrl(resource.public_id, { width: 700, quality: 75 }),
        category: cat.id,
        title:    cat.title,
        alt:      `${cat.label} — HCK Rental`,
        publicId: resource.public_id,
      })
    }
  }

  writeGalleryFile(allItems)
  console.log(`\n✅ gallery.js generado con ${allItems.length} imágenes`)
}

function writeGalleryFile(items) {
  const categoriesExport = `export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'embajadas', label: 'Embajadas' },
  { id: 'graduaciones', label: 'Graduaciones' },
  { id: 'quinceanos', label: 'Quinceaños' },
  { id: 'corporativos', label: 'Corporativos' },
]`

  const itemsStr = JSON.stringify(items, null, 2)
  const content = `// AUTO-GENERADO por scripts/sync-cloudinary.mjs — no editar manualmente
// Última sincronización: ${new Date().toISOString()}

export const galleryItems = ${itemsStr}

${categoriesExport}
`
  const outPath = join(__dirname, '../src/data/gallery.js')
  writeFileSync(outPath, content, 'utf8')
}

function writeFallback() {
  // Keep placeholder data when no Cloudinary credentials are set
  // (useful for local dev without .env)
  const content = `// Galería de ejemplo — configurá Cloudinary para usar fotos reales
// Ver scripts/sync-cloudinary.mjs

export const galleryItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=75', category: 'bodas', title: 'Boda', alt: 'Boda' },
  { id: 2, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=75', category: 'corporativos', title: 'Corporativo', alt: 'Corporativo' },
  { id: 3, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=75', category: 'cumpleanos', title: 'Cumpleaños', alt: 'Cumpleaños' },
  { id: 4, src: 'https://images.unsplash.com/photo-1478146059778-26b9f5d59215?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1478146059778-26b9f5d59215?w=600&q=75', category: 'bodas', title: 'Boda', alt: 'Boda' },
  { id: 5, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=75', category: 'graduaciones', title: 'Graduación', alt: 'Graduación' },
  { id: 6, src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=75', category: 'quinceanos', title: 'Quinceaños', alt: 'Quinceaños' },
  { id: 7, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=75', category: 'bodas', title: 'Boda', alt: 'Boda' },
  { id: 8, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75', category: 'corporativos', title: 'Corporativo', alt: 'Corporativo' },
  { id: 9, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=75', category: 'bodas', title: 'Boda', alt: 'Boda' },
  { id: 10, src: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1464347744102-11db6282f854?w=600&q=75', category: 'cumpleanos', title: 'Cumpleaños', alt: 'Cumpleaños' },
  { id: 11, src: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=75', category: 'embajadas', title: 'Embajada', alt: 'Embajada' },
  { id: 12, src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1200&q=85', thumb: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=75', category: 'bodas', title: 'Boda', alt: 'Boda' },
]

export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'embajadas', label: 'Embajadas' },
  { id: 'graduaciones', label: 'Graduaciones' },
  { id: 'quinceanos', label: 'Quinceaños' },
  { id: 'corporativos', label: 'Corporativos' },
]
`
  const outPath = join(__dirname, '../src/data/gallery.js')
  writeFileSync(outPath, content, 'utf8')
}

main().catch((err) => {
  console.error('Error en sync-cloudinary:', err.message)
  writeFallback()
})
