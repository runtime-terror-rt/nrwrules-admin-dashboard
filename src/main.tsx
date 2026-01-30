import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App'
import ReduxProvider from './redux/provider'

const rootElement = document.getElementById('root')

createRoot(rootElement!).render(
  <StrictMode>
    <ReduxProvider>
      <App />
      <Toaster />
    </ReduxProvider>
  </StrictMode>
)
