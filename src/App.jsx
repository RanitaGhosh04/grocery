import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LocalTasker from './components/LocalTasker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LocalTasker/>
    </>
  )
}

export default App
