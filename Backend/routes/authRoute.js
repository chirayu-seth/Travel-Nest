const express = require("express");
const { signup, login, logout } = require("../controllers/AuthController");
const { userVerification } = require("../middleware/authMiddleware");
const {createHosting} = require("../controllers/HomeController")
const {getAllHostings}=require("../controllers/HomeController")
const {search}=require("../controllers/HomeController")

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", userVerification);
router.post("/Hosting/new", createHosting); 
router.get("/Hosting", getAllHostings);
router.get("/search", search)
 

module.exports = router;