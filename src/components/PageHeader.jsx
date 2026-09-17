import Container from './ui/Container'

// Cabecera de página interna: sin foto. H1 display en cobre centrado y una frase de apoyo.
export default function PageHeader({ title, intro }) {
  return (
    <Container as="header" className="pb-4 pt-12 text-center md:pt-20">
      <h1 className="hero-enter type-display mx-auto max-w-[18ch] text-cobre">{title}</h1>
      {intro && (
        <p className="hero-enter mx-auto mt-8 max-w-[34ch] text-heading font-light text-ink md:max-w-[42ch]" style={{ '--i': 1 }}>
          {intro}
        </p>
      )}
    </Container>
  )
}
