
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/customAnimations.css'
import { checkEnvVariables } from './lib/env.ts'

// Check environment variables on startup
checkEnvVariables();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
