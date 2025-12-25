import React from 'react'
import {Register} from './Component/Register.jsx'
import {Login} from './Component/Login.jsx'
import {Routes, Route} from 'react-router-dom'
import { Home } from './Component/Home.jsx'
import { ProtectedRoute } from './Component/Protection/ProtectedRoute.jsx'
import { Provider } from 'react-redux'
import {store} from './Component/Redux/store.js'
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
         <Provider store={store}>
                <Home />
              </Provider>
            </ProtectedRoute>
          }
        />

      </Routes>
  )
}

export default App
