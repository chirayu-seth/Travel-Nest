
const jwt = require("jsonwebtoken");
const user = require("../Models/user");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      console.log(err.message)
     return res.json({ status: false })
    } else {
      const User = await user.findById(data.id)
      if (User) return res.json({ status: true, user: User.username, email: User.email })
      else return res.json({ status: false })
    }
  })
}