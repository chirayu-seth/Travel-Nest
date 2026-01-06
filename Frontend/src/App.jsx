import "./App.css"
import Navbar from "./Navbar"
import Home from "../pages/Home"
import AddHosting from "../pages/AddHosting"
import Login from "../pages/Login"
import HostingDetail from "../pages/HostingDetail"
import SignUp from "../pages/SignUp"
import ProtectedRoute from "./ProtectedRoute";

import Footer from "./Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditHosting from "../pages/EditHosting"
  import { ToastContainer, toast } from 'react-toastify';
import { AuthContext, AuthProvider } from "./AuthContext"


function App() {


  return (
   
   <BrowserRouter>
   <ToastContainer/>
   <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/signup" element={<SignUp/>}> </Route>
        <Route path="/home" element={<ProtectedRoute> <Home/> </ProtectedRoute>}> </Route>
        <Route path="/Hosting/:id" element={<HostingDetail/>}> </Route>
        <Route path="/Hosting/add" element={<AddHosting/>}> </Route>
        <Route path="/Hosting/edit/:id" element={<EditHosting/>}> </Route>
        </Routes>
      
      <Footer/>
        </AuthProvider>

       </BrowserRouter>
      
 
  )
}

export default App
