const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../Models/user");

exports.signup = async (req,res)=>{
    try{
        let {email, username, password}=req.body;
  
        const existingUser = await user.findOne({ email });
         if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash( password,salt, async(err,hash)=>{  
    let createUser=await user.create({
    email,
    username,
    password: hash
})
 const token = jwt.sign({email, id: createUser._id}, process.env.JWT_SECRET, {expiresIn:"7d"})
  res.cookie("token", token, { httpOnly: true ,sameSite: "strict", maxAge:7 * 24 * 60 * 60 * 1000 }).json({ message: "Signed up" });
});

      }) 
} catch(err){
    res.status(500).json({ message: err.message });
} 
}



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
       secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:7 * 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login successful", user: existingUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.logout = async (req, res) => {
  try {
  res.clearCookie("token")
  return res.status(200).json({ message: "logout Successfull" });
  
}catch(err){
return res.status(500).json({ message: err.message });
}
};