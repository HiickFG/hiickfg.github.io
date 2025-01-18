// Styles
import './styles/tailwind.css';
import './styles/main.less';

// Scripts
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import { HeroUIProvider } from '@heroui/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </HeroUIProvider>
  </StrictMode>,
);