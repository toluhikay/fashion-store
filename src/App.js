import React from 'react'
import Home from './components/routes/home/home.component'
import Navigation from './components/routes/navigation/navigation.component'
import Authentication from './components/routes/authentication/authentication.component'
import { Route, Routes } from 'react-router'
const Shop=()=>{
  return(
    <h1>I am the shop component</h1>
  )
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home/>} />
        <Route path='/shop' element = {<Shop/>}></Route>
        <Route path='auth' element = {<Authentication/>}></Route>
      </Route>
    </Routes>
  )
}

export default App