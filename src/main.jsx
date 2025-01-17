
// Styles
import './styles/main.less';

// Scripts
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './aapp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
