import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Arcs from "./Arcs.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Arcs />
  </StrictMode>,
)
