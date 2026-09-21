import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/*
 * React 19 hoists <title>, <meta> and <link> from the component tree into
 * <head>, but it appends rather than replacing what is already there. The
 * static defaults in index.html exist so crawlers and social scrapers get
 * correct tags without executing JS — once we are about to render, they have
 * done their job and must go, or the page ships two canonicals.
 */
document.querySelectorAll('head [data-static-seo]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
