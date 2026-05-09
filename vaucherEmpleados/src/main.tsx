import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PagoVaucher } from './pagoVaucher'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PagoVaucher />
  </StrictMode>,
)
