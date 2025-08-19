import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CategoriaProvider } from './context/CategoriaContext';
import { BrowserRouter } from 'react-router-dom';
let savedAtLocal = localStorage.getItem('savedThemes', '')
 
createRoot(document.getElementById('root')).render(
  

  <StrictMode>
    <BrowserRouter>
      <CategoriaProvider>
        <App />
      </CategoriaProvider>
    </BrowserRouter>
  </StrictMode>,
)
