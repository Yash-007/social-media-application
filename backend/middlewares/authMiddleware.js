const jwt= require("jsonwebtoken")

exports.authMiddleware=async(req,res,next)=>{
    try {
        const token = req.header("Authorization");
        const refreshToken= req.headers['refresh-token'];

        // if token and refreshToken does not exits 
        if(!token && !refreshToken){
            return res.status(401).json({
                success:false,
                message:"Access Denied"
            })
        }
        const decryptedData= jwt.verify(token,process.env.SECRETKEY);
        req.body.id= decryptedData.userId;
        next();
    } catch (error) {
     refreshToken= req.headers['refresh-token'];
        if(!refreshToken){
            return res.status(401).json({
                success:false,
                message:"Access Denied"
            })
        }
    // if token does not exits but refreshToken exits
        try {
            decryptedData = jwt.verify(refreshToken, process.env.SECRETKEY);
            token = jwt.sign({userId: decryptedData.userId}, process.env.SECRETKEY, {expiresIn:'1d'})
            req.body.id= decryptedData.userId;
            req.body.token= token;
            next();
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Access Denied"
            })
        }
    }
}