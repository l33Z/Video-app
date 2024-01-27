import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@/providers/theme-provider'
import DailyCallProvider from '@/providers/daily-call-provider'
import ReactQueryProvider from '@/providers/react-query-provider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ReactQueryProvider>
      <DailyCallProvider>
        <App />
      </DailyCallProvider>
    </ReactQueryProvider>
  </ThemeProvider>
)
