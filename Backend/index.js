require("dotenv").config();

const express= require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const cors=require("cors")
const cookieParser = require("cookie-parser");
const home=require("./Models/homes");

const multer=require("multer")
const {storage}=require("./cloudinary")
const upload=multer({storage});

const router = require("./routes/authRoute");


const PORT=process.env.PORT|| 5000;
const url=process.env.MONGO_URL;
mongoose.connect(url)
console.log("DB Connented!")



app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));


app.use("/", router);

// for inserting data to the mongo

// app.get("/addHomes",async(req,res)=>{
//    const data=await home.insertMany(Hosting)
//    res.json(data);
// })


//for upload image

app.post("/upload",upload.single("image"), (req,res)=>{
    res.json({url:req.file.path})
})




// for getting the data to our screen

app.get("/allHosting",  async(req,res)=>{
    const data= await home.find({});
    res.json(data);
})

//For getting hosting by id means to see in detail individually

app.get("/Hosting/:id", async(req,res)=>{
const Item = await home.findById(req.params.id);
    res.json(Item);

})

//for adding new hosting
app.post("/Hosting/new",async (req,res)=>{
    const newHome = new home(req.body);
    await newHome.save();
     res.json({ message: "Hosting created successfully!" });
     
})

//for update existing hostings

app.put("/Hosting/:id", async(req,res)=>{
    const updated= await home.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updated);
})

//for delete existing hostings

app.delete("/Hosting/:id", async(req,res)=>{
    const Deleted = await home.findByIdAndDelete(req.params.id);
    res.json(Deleted)
})



















app.listen(PORT,()=>{
    console.log(`App Started! ${PORT}`);
})