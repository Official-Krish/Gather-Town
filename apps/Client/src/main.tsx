import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Appbar from './components/Appbar.tsx'
import { Footer } from './components/footer.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Appbar/>
    <App />
    <Footer/>
  </BrowserRouter>
)
