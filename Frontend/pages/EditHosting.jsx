import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditHosting() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: { url: "" },
    price: "",
    country: "",
    location: ""
  });
    const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/Hosting/${id}`)
      .then(res => setFormData(res.data))
      .catch(console.error);
  }, [id]);

    const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  const handleSubmit = async () => {
    try {
          let imageUrl = formData.image?.url;

      if (imageFile) {
        const imgForm = new FormData();
        imgForm.append("image", imageFile);
        const imgRes = await axios.post("http://localhost:5000/upload", imgForm);
        imageUrl = imgRes.data.url;
      }

      const payload = {
        ...formData,
        image: { url: imageUrl }
      };
      await axios.put(`http://localhost:5000/Hosting/${id}`, payload);
     
      navigate(`/Hosting/${id}`);
      toast.success("Hosting updated!") 
      
    } catch (err) {
      console.error(err);
     toast.error("Update failed!") 
    }
  };

  return (
    <> 
    <div className="new">
      <h1>Edit your Hosting</h1>
      <p>Title</p>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      <p>Description</p>
      <input type="text" name="description" value={formData.description} onChange={handleChange} />
    
       {(imageFile || formData.image?.url) && (
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : formData.image.url}
            alt="Preview"
            style={{ width: "200px", marginTop: "1rem", borderRadius: "10px" }}
          />
        )}
          <p>Replace Hosting Image</p>
      <input type="file" name="image"  onChange={handleImageChange} />
      <div className="price-country-row">
      <p>Price</p>
      <input type="text" name="price" value={formData.price} onChange={handleChange} />
      <p>Country</p>
      <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </div>
      <p>Location</p>
      <input type="text" name="location" value={formData.location} onChange={handleChange} />
      <button className="button-new" onClick={handleSubmit}>Edit</button>
      </div>
    </>
  );
}
