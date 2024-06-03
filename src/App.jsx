import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import GroceryCart from './components/GroceryCart'
import { ToastContainer } from 'react-toastify';


function App() {
  
  return (
    <>
     <ToastContainer />
      <GroceryCart />
    </>
  )
}

export default App
