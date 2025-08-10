import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CategoriaProvider } from './context/CategoriaContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoriaProvider>
    <App />
    </CategoriaProvider>
  </StrictMode>,
)
