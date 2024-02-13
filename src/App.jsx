import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PasswordReset from './pages/PasswordReset';
import Home from "./pages/Home"
import Venues from "./pages/Venues";
import UpdatePassword from './pages/UpdatePassword';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <Routes>
      <Route  path='/login' element={<Login />} />
      <Route  path='/signup' element={<SignUp /> }/>
      <Route  path='/passwordReset' element={<PasswordReset />}/>
      <Route  path='/updatePassword' element={<UpdatePassword />}/>
      <Route  path='/' element={<Home />}/>
      <Route  path='/venue' element={<Venues />}/>
    </Routes>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition: Bounce />
    </>
  )
}

export default App