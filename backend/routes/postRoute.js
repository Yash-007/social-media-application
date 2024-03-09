const express= require("express");
const { createPost, getPosts } = require("../controllers/postController");
const router= express.Router();
const Upload = require("../middlewares/multer");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/create",Upload.fields([{name:'profilePic', maxCount:1},{name:'image',maxCount:1}]),createPost);
router.get("/get",authMiddleware, getPosts);

module.exports= router;