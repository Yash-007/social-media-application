const { rm } = require("fs");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { fields } = require("../middlewares/multer");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

   exports.registerUser= async(req,res)=>{
    try {
        // check if username or email already exists 
        const {userName,email}= req.body;
        let user= await User.findOne({userName});
        if(user){
            rm(`${req.file.path}`,()=>{
                console.log("file deleted");
            })
            return res.status(400).json({
                success:false,
                message: "Username already exists"
            })
        }
        user= await User.findOne({email});
        // delete the currently uploaded image if user already exists 
        if(user){
            rm(`${req.file.path}`,()=>{
                console.log("file deleted");
            })
            return res.status(400).json({
                success:false,
                message: "Email already exists"
            })
        }
        
        // store file 
        if(req.file)
        req.body.profilePic= req?.file?.filename;

        // password hashing 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password=hashedPassword;


        req.body.confirmPassword= undefined;
        
        // create user 
        user = await User.create(req.body);

        // generate access token and refresh token 
       const token= jwt.sign({userId: user._id}, process.env.SECRETKEY,{expiresIn:'1d'});
       const refreshToken = jwt.sign({userId: user._id},process.env.SECRETKEY,{expiresIn:'7d'});
       
 
       user.token=  token;
       user.refreshToken=refreshToken;
       user= new User(user);
       await user.save();

    //    sending verification mail 
        const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token}`;
       const err= await sendEmail(user.email, "Verify Email", url);
       
       if(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })        
       }
        return res.status(201).json({
            success: true,
            message:"An email has been sent to your account, please verify"
        })
       
    } catch (error) {
      return res.status(500).json({
        success:false,
        message: "Internal Server Error",
      })
}
}

exports.SigninUser= async(req,res)=>{
    try {
        // check if user exits
        const {email}= req.body;
       let user= await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message: "User does not exits"
            })
        }

    // checking password 
   const isValid = await bcrypt.compare(req.body.password, user.password);
   if(!isValid){
    return res.status(401).json({
        success:false,
        message: 'Incorrect password'
    })
   }

   if(!user.verified){
    // if user is not verified then sending verification mail 
     const token = user.token;
     const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token}`;
     const err= await sendEmail(user.email, "Verify Email", url);
     
     if(err){
      return res.status(500).json({
          success: false,
          message:err.message
      })        
     }
      return res.status(200).json({
          success: true,
          message:"An email has been sent to your account, please verify"
      })
     }
    
    //  generation token 
     const token = jwt.sign({userId: user._id}, process.env.SECRETKEY, {expiresIn:'1d'})
     const refreshToken = jwt.sign({userId: user._id}, process.env.SECRETKEY, {expiresIn:'1d'});
     
     return res.status(200).json({
        success:true,
        user,
        token,
        refreshToken
     })
    } catch (error) {
      return res.status(500).json({
        success:false,
        message: "Internal Server Error",
      })
}
}

  exports.verifyToken=async(req,res)=>{
    try {
        let user = await User.findOne({_id: req.params.id, token: req.params.token});
        if(!user) return res.status(400).json({success:false,message: "Invalid link"})
        
        const token= req.params.token;
        const refreshToken= user.refreshToken;
         user.token= undefined;
         user.refreshToken= undefined;
         user.verified= true;

         user = new User(user);
        await user.save();

        return res.status(200).json({
            success:true,
            user:user,
            token,
            refreshToken
         })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
         })  
    }
  }

  exports.getCurrentUser=async(req,res)=>{
    try {
        // check if user exist 
        const user=await User.find({_id: req.body.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        user[0].password= undefined
       return res.status(200).json({
            success:true,
            user:user[0],
            token:(req.body.token)? token : null
        });
    } catch (error) {
       return res.status(401).json({
            success:false,
            message:"Access Denied"
        })
    }
  }


  exports.resetPassword=async(req,res)=>{
    try {
        // check if password is correct 
        let user =await User.findOne({_id: req.body.id});
        const isValid = await bcrypt.compare(req.body.currentPassword, user.password)
        if(!isValid){
           return res.status(400).json({
                success:false,
                message: "Incorrect password"
            })
        }
        // hashing  new password 
        const salt= await bcrypt.genSalt(10);   
        const HashedPassword= await bcrypt.hash(req.body.newPassword,salt);
        user.password=HashedPassword;
        
        user= new User(user);
       await user.save();
        res.status(200).json({
            success:true,
            message: "Password updated successfully",
        })
    } catch (error) {
       return res.status(401).json({
            success:false,
            message: "Access denied",
        })
    }
  }