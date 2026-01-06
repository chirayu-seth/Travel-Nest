const jwt = require("jsonwebtoken");
const Home = require("../Models/homes");

exports.createHosting = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hosting = await Home.create({
      ...req.body,
      owner: decoded.id, 
    });

    res.status(201).json({ message: "Hosting created", hosting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllHostings = async (req, res) => {
  try {
    const hostings = await Home.find().populate("owner", "username");
    res.json(hostings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.search=async(req,res)=>{
  try{
const {query}=req.query;
if (!query){
  return res.status(400).json({message:"serch query is required"})
}

const hosting= await Home.find({
$or:[
  {title: {$regex:query, $options:"i"}},
  {description:{$regex:query, $options:"i"}},
  {city: {$regex:query, $options:"i"}}
]
})
return res.status(200).json(hosting);
  } catch(err){
console.log(err)
return res.status(500).json({message:"internal server error"})
  }
}
