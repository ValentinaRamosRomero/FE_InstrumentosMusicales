import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MainApp from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp/>
  </StrictMode>,
)
