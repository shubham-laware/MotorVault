import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Assets from './pages/Assets'
import AssetInfo from './pages/AssetInfo'
import Tickets from './pages/Tickets'
import Layout from './layout/Layout'

function App() {
  return (
    
    <Router>
      <Layout>
      <Routes>
      
        <Route path='/' element={<Dashboard/>} />
        <Route path='/assets' element={<Assets/>} />
        <Route path='/asset-info' element={<AssetInfo/>} />
        <Route path='/tickets' element={<Tickets/>} />
      </Routes>
      </Layout>
    </Router>
    
  )
}

export default App
