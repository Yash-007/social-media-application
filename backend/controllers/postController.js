const Post = require("../models/postModel")

exports.createPost=async(req,res)=>{
  try {
    if(req.files){
        req.body.profilePic = req.files['profilePic'][0].filename;
        req.body.image= req.files['image'][0].filename;
    }
    const post = Post.create(req.body);
    res.status(201).json({
        success:true,
        message:"Post created successfully"
    })
  } catch (error) {
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
  }   
}

exports.getPosts=async(req,res)=>{
  try {
    const page = req.query.page || 1;
    let limit = Number(process.env.ITEMS_PER_PAGE) || 6;
    let skip = (page-1)*(limit);

    // applying filters 
  const [posts,allPosts]= await Promise.all([Post.find({}).limit(limit).skip(skip), Post.find({})]);

    let totalPage= Math.ceil(allPosts.length/limit);

   return res.status(200).json({
      success:true,
      posts,
      totalPage,
    })
  } catch (error) {
   return res.status(500).json({
      success:false,
      message:"Internal Server Error",
    })
  }
}
