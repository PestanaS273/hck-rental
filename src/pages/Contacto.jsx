import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import { ArrowRight } from '../components/ui/Icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { services } from '../content/services'
import { eventTypes, site, whatsappUrl } from '../content/site'

const initial = { nombre: '', tipo: '', fecha: '', ciudad: '', invitados: '', servicios: [], mensaje: '' }

// Sin backend: el formulario arma un mensaje ordenado y lo abre en WhatsApp.
function composeMessage(v) {
  return [
    'Hola, quiero cotizar infraestructura para un evento.',
    `Nombre: ${v.nombre}`,
    `Tipo de evento: ${v.tipo}`,
    v.fecha && `Fecha: ${v.fecha}`,
    `Ciudad / lugar: ${v.ciudad}`,
    v.invitados && `Invitados aprox.: ${v.invitados}`,
    v.servicios.length > 0 && `Necesito: ${v.servicios.join(', ')}`,
    v.mensaje && `Detalles: ${v.mensaje}`,
  ].filter(Boolean).join('\n')
}

export default function Contacto() {
  useDocumentMeta('/contacto')

  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }))
  const toggleService = (title) =>
    setValues((v) => ({
      ...v,
      servicios: v.servicios.includes(title) ? v.servicios.filter((s) => s !== title) : [...v.servicios, title],
    }))

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!values.nombre.trim()) next.nombre = 'Escribe tu nombre.'
    if (!values.tipo) next.tipo = 'Elige el tipo de evento.'
    if (!values.ciudad.trim()) next.ciudad = 'Indica la ciudad o el lugar.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.getElementById(`campo-${Object.keys(next)[0]}`)?.focus()
      return
    }
    window.open(whatsappUrl(composeMessage(values)), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <PageTransition>
      <main>
        <PageHeader
          title="Cotiza tu evento"
          intro="Cuéntanos lo esencial y te respondemos por WhatsApp con la infraestructura que necesitas."
        />

        <Container className="mt-16 grid gap-16 md:grid-cols-[1fr_20rem] md:gap-12 lg:grid-cols-[1fr_24rem]">
          <form noValidate onSubmit={onSubmit} className="reveal grid gap-6 sm:grid-cols-2" aria-describedby="nota-formulario">
            <Field id="nombre" label="Nombre" error={errors.nombre} required>
              <input className="field" autoComplete="name" value={values.nombre} onChange={set('nombre')} />
            </Field>
            <Field id="tipo" label="Tipo de evento" error={errors.tipo} required>
              <select className="field appearance-none" value={values.tipo} onChange={set('tipo')}>
                <option value="">Elegir…</option>
                {eventTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field id="fecha" label="Fecha tentativa">
              <input className="field" type="date" value={values.fecha} onChange={set('fecha')} />
            </Field>
            <Field id="ciudad" label="Ciudad o lugar" error={errors.ciudad} required>
              <input className="field" autoComplete="address-level2" placeholder="La Paz, Achumani…" value={values.ciudad} onChange={set('ciudad')} />
            </Field>
            <Field id="invitados" label="Invitados aproximados">
              <input className="field" type="number" inputMode="numeric" min="1" value={values.invitados} onChange={set('invitados')} />
            </Field>

            <fieldset className="sm:col-span-2">
              <legend className="type-label text-ink">Qué necesitas</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.title)}
                    aria-pressed={values.servicios.includes(s.title)}
                    className={`btn ${values.servicios.includes(s.title) ? 'btn-cobre [&::before]:hidden' : 'btn-quiet'}`}
                  >
                    {values.servicios.includes(s.title) && <Check />}
                    {s.title}
                  </button>
                ))}
              </div>
            </fieldset>

            <Field id="mensaje" label="Detalles" className="sm:col-span-2">
              <textarea className="field min-h-32 resize-y" rows={4} placeholder="Espacio, horarios, si es al aire libre…" value={values.mensaje} onChange={set('mensaje')} />
            </Field>

            <div className="flex flex-col items-start gap-4 sm:col-span-2">
              <button type="submit" className="btn btn-cobre">
                Enviar por WhatsApp <ArrowRight />
              </button>
              <p id="nota-formulario" className="text-body text-ink-soft">
                Se abrirá WhatsApp con tu mensaje listo para enviar.
              </p>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-body text-cobre"
                  >
                    Si WhatsApp no se abrió, escríbenos directamente al {site.whatsapp}.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>

          <aside className="reveal flex flex-col gap-8 md:border-l md:border-adobe-line md:pl-12" style={{ '--i': 1 }} aria-label="Contacto directo">
            <div>
              <h2 className="type-label text-ink-soft">WhatsApp</h2>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-cobre mt-1 text-heading font-light">
                {site.whatsapp}
              </a>
            </div>
            {site.instagram && (
              <div>
                <h2 className="type-label text-ink-soft">Instagram</h2>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-cobre mt-1 text-subhead-lg">
                  {site.instagramHandle}
                </a>
              </div>
            )}
            <div>
              <h2 className="type-label text-ink-soft">Cobertura</h2>
              <p className="mt-2 text-body-lg text-ink">
                Base en {site.baseCity}. Montamos en cualquier ciudad de Bolivia.
              </p>
            </div>
          </aside>
        </Container>
      </main>
    </PageTransition>
  )
}

function Field({ id, label, error, required, className = '', children }) {
  const errorId = useId()
  const control = {
    ...children.props,
    id: `campo-${id}`,
    name: id,
    required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
  }
  return (
    <div className={className}>
      <label htmlFor={`campo-${id}`} className="type-label text-ink">
        {label}{required && <span className="text-cobre" aria-hidden="true"> *</span>}
      </label>
      <div className="mt-2">
        <children.type {...control} />
      </div>
      {error && <p id={errorId} className="mt-2 text-body text-cobre">{error}</p>}
    </div>
  )
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
