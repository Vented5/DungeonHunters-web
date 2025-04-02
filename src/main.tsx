import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css';
import App from './App.tsx';
import { AnimatedBg } from './components/AnimatedBg.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AnimatedBg>
    <App />
    </AnimatedBg>
  </StrictMode>,
)