import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './providers/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/index.tsx'
import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
              <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
