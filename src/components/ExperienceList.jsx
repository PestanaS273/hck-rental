import Container from './ui/Container'
import { experience } from '../content/site'

// Lista tipográfica de experiencia: nombres, nunca logotipos sin autorización.
export default function ExperienceList() {
  return (
    <Container as="section" aria-labelledby="experiencia-titulo" className="mt-section text-center">
      <h2 id="experiencia-titulo" className="reveal type-label text-cobre">Experiencia en montajes para</h2>
      <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3 text-subhead-lg font-light text-ink">
        {experience.map((name, i) => (
          <li key={name} className="reveal" style={{ '--i': i }}>{name}</li>
        ))}
      </ul>
    </Container>
  )
}
