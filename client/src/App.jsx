import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage.jsx'
import axios from 'axios'
import { UserContextProvider } from './UserContext.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import PlacesPage from './pages/PlacesPage.jsx'
import PlacesFormPage from './pages/PlacesFormPage.jsx'
import PlacePage from './pages/PlacePage.jsx'

axios.defaults.baseURL = 'http://localhost:8000'; 
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Corrected path */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
