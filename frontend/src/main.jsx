import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { ModalProvider } from './context/ModalContext'
import { UserProvider } from './context/UserContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { BilheteProvider } from './context/BilheteContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <UserProvider>
          <BilheteProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </BilheteProvider>
        </UserProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
)
