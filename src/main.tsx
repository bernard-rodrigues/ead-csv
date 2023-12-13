import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import { FieldsProvider } from './contexts/Fields.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FieldsProvider>
      <App />
    </FieldsProvider>
  </React.StrictMode>,
)
