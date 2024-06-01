import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Assets from './pages/Assets'
import AssetInfo from './pages/AssetInfo'
import Tickets from './pages/Tickets'
import Layout from './layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    <Router>
      <Layout>
      <Routes>
      
        <Route path='/' element={<Dashboard/>} />
        <Route path='/assets' element={<Assets/>} />
        <Route path='/asset/:assetName' element={<AssetInfo/>} />
        <Route path='/tickets' element={<Tickets/>} />
      </Routes>
      </Layout>
      <ToastContainer/>
    </Router>
    
  )
}

export default App
