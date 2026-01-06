import "./Login.css"
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../src/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
    const { setUser } = useContext(AuthContext);
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const navigate = useNavigate();

     const handleLogin=async(e)=>{
        e.preventDefault();
try{
  setError("");
  await axios.post("http://localhost:5000/login",{ email, password}, {withCredentials:true})

   const res = await axios.get("http://localhost:5000/verify", { withCredentials: true });
      console.log("Verify response:", res.data); // ✅ Debug line
      if (res.data.status) {
        setUser(res.data.user); // ✅ This updates Navbar immediately
      }
  

  navigate("/home");
  toast.success("Login Successfully")
} catch (err){
  setError(err.response?.data?.message || "login failed");
   toast.error(err.response?.data?.message)
}
  }
  return (
    <>
   <h1> Login to Travel Nest  </h1>

   <div className="hero">
     <div className="email">
        <p>Email</p>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
     </div>
       <div className="password">
        <p>Password</p>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
     </div>
        {error && <p className="error">{error}</p>}
     <button className="button" onClick={handleLogin}>Login</button>
    <p>create new account? <span className="span" onClick={()=>navigate("/signup")}>SignUp</span></p>
   
   </div>
   </>
  )
}