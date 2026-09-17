import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import Container from '../components/ui/Container'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta('/404')
  return (
    <PageTransition>
      <main>
        <PageHeader title="Esta página no existe" intro="Puede que el enlace haya cambiado." />
        <Container className="mt-10 text-center">
          <Link to="/" className="btn btn-cobre">Volver al inicio</Link>
        </Container>
      </main>
    </PageTransition>
  )
}
