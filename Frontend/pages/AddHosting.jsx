import { useState } from "react";
import "./AddHosting.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AddHosting() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const imgForm = new FormData();
      imgForm.append("image", imageFile);
      const imgRes = await axios.post("https://travel-nest-rnob.onrender.com/upload", imgForm);
      const imageUrl = imgRes.data.url;

      const payload = {
        ...formData,
        image: { url: imageUrl },
      };

      await axios.post("https://travel-nest-rnob.onrender.com/Hosting/new", payload , {withCredentials:true});
      
      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
        location: "",
        country: "",
      });
      setImageFile(null);
      navigate("/");
      toast.success("Hosting created successfully!")
    } catch (err) {
      console.error("Error uploading or submitting:", err);
       toast.error("Something went wrong")
    }
  };

  return (
    <>
      <h1>Host a new Property</h1>
      <div className="new">
        <p>Title</p>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <p>Description</p>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />

        <p>Upload Hosting Image</p>
        <input type="file" name="image" onChange={handleImageChange} />

        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            style={{ width: "200px", marginTop: "1rem", borderRadius: "10px" }}
          />
        )}

        <div className="price-country-row">
          <p>Price</p>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
          <p>Country</p>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </div>

        <p>Location</p>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />


        <button className="button-new" onClick={handleSubmit}>Add</button>
        
      </div>
    </>
  );
}
