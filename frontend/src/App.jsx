import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home'
import { useState } from 'react'
import Login from './views/Login'
import SignUp from './views/SignUp'

function App() {
  
   return (
    <BrowserRouter>
    <div className="container-xl bg-[#F0F5FE] dark:bg-gray-800">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>  
        </Routes>
    </div>
    </BrowserRouter> //HomePage
    
  )
}

export default App
