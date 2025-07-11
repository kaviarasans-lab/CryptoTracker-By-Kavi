
import Navbar from './Navbar'
import logo from './assets/logo.png'
import './Navbar.css'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './Footer/Footer'

const App = () => {
  return (
    <div className='app'>

    <Navbar/>

    <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/coin/:coinId' element = {<Coin/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
