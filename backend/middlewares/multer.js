const multer = require("multer");

const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,"backend/uploads/profile");
    },
    filename(req,file,callback){
        const extName= file.originalname.split(".").pop();
        const date= Date.now()
        const fileName = `${date}.${extName}`;
        callback(null, fileName)
    }
})

 
module.exports=multer({storage});