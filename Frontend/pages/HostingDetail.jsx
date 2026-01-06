import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./HostingDetail.css"
import {Link} from "react-router-dom"
import { toast } from "react-toastify";

export default function HostingDetail() {
  const { id } = useParams();
  const [home, setHome] = useState();
  const [confirmingDelete, setConfirmingDelete]=useState(false);

   const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/Hosting/${id}`)
      .then((res) => setHome(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete=async()=>{
  await axios.delete(`http://localhost:5000/Hosting/${id}`)
  
  navigate("/");
   toast.success("Hosting Deleted!")
}
  

  if (!home) return null;

  return (
    <div className="hero">
       <h1>{home.title}</h1>
      <img  className="image"src={home.image.url} alt="image" />
     <div className="section">
       <p><strong>Owner:</strong> {home.owner?.username}</p>

      <p>{home.description}</p>
       <p> &#8360; {home.price.toLocaleString("en-IN")}</p>
      <p>  {home.location} </p>
      <p>   {home.country} </p>

     </div>

     <div className="button">
     <Link to={`/Hosting/edit/${home._id}`}>
     <button>Edit </button>
     </Link>

        {!confirmingDelete ? (
          <button onClick={() => setConfirmingDelete(true)}>
             Delete
          </button>
        ) : (
          <>
            <button
              onClick={handleDelete}

            >
              Confirm Delete
            </button>
            <button onClick={() => setConfirmingDelete(false)}>Cancel</button>
          </>
        )}


     
     </div>

    

     <h4>leave a review</h4>
     <form>
      <div>
        <label htmlFor="rating">Rating </label>
        <input type="range" min={"1"} max={"5"} id="rating" name="review[rating]" />
      </div>
      <div>
        <label htmlFor="comment">Comments</label>
        <textarea name="review[comment]" cols={"30"} rows={"10"} id="comment"></textarea>
      </div>
      <button>submit</button>
     </form>
    </div>
    
  );
}
