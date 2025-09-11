/**
 * MAIN —  main setup/ entrance for the React app.
 * Creates the app and puts it inside the HTML page.
 * Usually sets up the router and global providers.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
const qc = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter><App/></BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
