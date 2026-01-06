
import "./Navbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export default function Navbar(){
  const {user, setUser} = useContext(AuthContext);
    const { searchQuery, setSearchQuery, setSearchResults } = useContext(AuthContext);


    const handleLogout = () => {
    axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
         toast.success("Logout Succssfully")
      })
      .catch(err => console.log(err));
     
  };


    const handleSearchBackend = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.get(`/search?q=${searchQuery}`);
      setSearchResults(res.data);
    }
  };
return(
    <div className="container">
          <Link to="/"> <span>Travel Nest</span> </Link>
        
        <div className="searchBar">
            <input id="inp"  type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}  onKeyDown={handleSearchBackend} />
            <button className="btn">Search</button>
        </div>
        <div className="login">
          <Link to="/Hosting/add"> <button> Become a host </button>  </Link>

       {user ? (
          <>
            <p>Hi, {user}</p>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/signup"><p>Sign up</p></Link>
            <Link to="/login"><p>Log in</p></Link>
          </>
        )}
            
           </div>
             
    </div>
)
}