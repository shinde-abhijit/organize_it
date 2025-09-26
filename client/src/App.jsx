import { useState } from 'react'
import './App.css'
import AllRoutes from './AllRoutes/AllRoutes'
import Navbar from './Pages/Components/Navbar'
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Navbar />
      <AllRoutes />
      <Toaster />
    </>
  )
}

export default App
