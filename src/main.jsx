import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../index.css"
import App from './App.jsx'
import './css/Redesign.css'
import { BrowserRouter } from 'react-router-dom'
import {ProjectProvider} from './context/ProjectContext.jsx'
import AuthProvider from './context/AuthContext/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)