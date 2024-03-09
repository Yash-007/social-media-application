const mongoose= require("mongoose");

const postSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    profilePic:{
     type:String,
     required:true
    },
    userName:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,    
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    share:{
        type:Number,
        default:0
    },
    downloads:{
        type:Number,
        default:0
    },
})

const Post= mongoose.model("Post", postSchema);
module.exports= Post;