const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name is required"],
    },
    userName: {
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username needs to be unique"] 
    },
    email: {
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email needs to be unique"] 
    },
    password: {
        type:String,
        required:[true,"Please enter password"],
    },
    profilePic:{
        type: String,
        required:[true,"Please upload profile picture"],
    },
    token:{
        type: String,
    },
    refreshToken:{
        type: String,
    }, 
   verified:{
        type: Boolean,
        required:true,
        default: false,
    }
},
{
    timestamps: true
}
);

const User= mongoose.model('User',userSchema);
module.exports= User;