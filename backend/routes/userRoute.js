const express= require("express");
const { check, registerUser, getCurrentUser, resetPassword, verifyToken, SigninUser } = require("../controllers/userController");
const User = require("../models/userModel");
const Upload= require('../middlewares/multer');
const { authMiddleware } = require("../middlewares/authMiddleware");
const { rateLimiter } = require("../utils/rateLimit");
const router= express.Router();


router.post("/register",Upload.single("profilePic"),registerUser)

router.post("/signin",rateLimiter, SigninUser);

router.get("/:id/verify/:token", verifyToken)

router.get("/current", authMiddleware, getCurrentUser)

router.put("/reset",authMiddleware, resetPassword )

module.exports=router