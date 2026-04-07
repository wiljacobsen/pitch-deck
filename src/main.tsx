import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'
import App from './App'
import PartnershipPage from './pages/PartnershipPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/partnership" element={<PartnershipPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
