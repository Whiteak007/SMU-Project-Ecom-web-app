
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'

export const currency = '$';
export const backendUrl = import.meta.env.VITE_BACKEND_URL
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" autoClose={1000} transition={Slide} />
      {
        token === ""
          ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="flex w-full">
              <Sidebar
                isMobileSidebarOpen={isMobileSidebarOpen}
                toggleMobileSidebar={toggleMobileSidebar}
              />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} /> 
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default App
