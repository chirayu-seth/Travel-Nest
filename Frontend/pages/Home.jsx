import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import "./Home.css"
import { useState, useEffect } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"




export default function Home(){
const [allHosting, setAllHosting]=useState([]);
useEffect(()=>{
  axios.get("http://localhost:5000/allHosting").then((res)=>{
    setAllHosting(res.data)
  })
},[]);


  
    return(
<div className='card-container'>
     {allHosting.map((item,index)=>(
      <Card key={item._id} sx={{ maxWidth: 345, borderRadius:"15px"}}>
      <CardActionArea component={Link} to={`/Hosting/${item._id}`}>
        <CardMedia
          component="img"
          height="300"
          image={item.image.url}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
           {item.title} 
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
               &#8360;{item.price.toLocaleString("en-IN")} /night
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
     ))}
    </div>
    )
    
}