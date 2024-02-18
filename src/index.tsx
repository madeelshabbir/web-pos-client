
import ReactDOM from 'react-dom/client'
import App from './containers/app.js'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <ToastContainer theme='colored' />
  </BrowserRouter>,
)
