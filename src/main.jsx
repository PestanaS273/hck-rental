import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Las rutas llegan prerenderizadas (scripts/prerender.mjs): se hidratan. En desarrollo el root está vacío.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
