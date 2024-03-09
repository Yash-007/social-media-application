const mongoose = require("mongoose");

// connecting database 
exports.connectDB=()=>{
    mongoose.connect(process.env.mongo_url,)
    .then((c)=> console.log(`DB connected to ${c.connection.host}`))
    .catch((e)=> console.log(e));
}