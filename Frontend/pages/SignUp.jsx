import "./SignUp.css"
import { useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
export default function SignUp() {

  const [email, setEmail]=useState("")
  const [username, setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [error, setError] = useState("");
  const [show, setShow]= useState(false); 
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault(); 
try{
   e.preventDefault(); 
  setError("");
  const res= await axios.post("https://travel-nest-rnob.onrender.com/signup",{ username, email, password}, {withCredentials:true})
  
  
  navigate("/");
  toast.success("Signup Successfully")
} catch (err){
  setError(err.response?.data?.message || "signup failed");
    toast.error("Something went wrong")
}
  }
  
  return(
    <>
        <h1>Welcome to Travel Nest</h1>
        
           <div className="hero">
              {error && <p style={{ color: "red" }}>{error}</p>} 
     <div className="username">
        <p>Username</p>
        <input type="text" value={username} required onChange={(e)=>setUsername(e.target.value)}  />
     </div>
      <div className="email">
        <p>Email</p>
        <input type="text"  value={email}  required onChange={(e)=>setEmail(e.target.value)} />
     </div>
       <div className="password">
        <p>Password</p>
        <input type={show?"text":"password"} value={password} required  onChange={(e)=>setPassword(e.target.value)}  />
        { !show && <MdRemoveRedEye className="eye" onClick={()=>setShow(prev=>!prev)} />}
       {show &&  <IoMdEyeOff className="eye"  onClick={()=>setShow(prev=>!prev)}/>}

     </div>
     <button className="button" onClick={handleSubmit}>Signup</button>
     <p>Already have a account? <span className="span" onClick={()=>navigate("/login")}>Login</span></p>
   </div>
   </>
  ) 
}