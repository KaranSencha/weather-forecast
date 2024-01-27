import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CityContextProvider from './context/CityContextProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CityContextProvider>
    <App />
    </CityContextProvider>
  </React.StrictMode>,
)
