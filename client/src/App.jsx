import React from 'react'; // Added import for React
import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage.jsx'
import axios from 'axios'
import { UserContextProvider } from './UserContext.jsx'
import AccountPage from './pages/AccountPage.jsx'
import PlacesPage from './pages/PlacesPage.jsx' // Added import for PlacesPage

axios.defaults.baseURL = 'http://localhost:8000'; 
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path='/account/:subpage?' element={<AccountPage/>}></Route>
          <Route path='/account/:subpage/:action' element={<AccountPage/>}></Route>
          <Route path='/places' element={<PlacesPage/>}/> {/* Added route for PlacesPage */}
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
