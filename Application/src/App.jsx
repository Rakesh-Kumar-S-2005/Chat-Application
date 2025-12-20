import React from 'react'
import {Register} from './Component/Register.jsx'
import {Login} from './Component/Login.jsx'
import {Routes, Route} from 'react-router-dom'
import { Home } from './Component/Home.jsx'
import { ProtectedRoute } from './Component/Protection/ProtectedRoute.jsx'
function App() {
 

  return (
     <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
  )
}

export default App
