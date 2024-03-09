const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./config/database");
const userRoute= require('./routes/userRoute');
const postRoute= require("./routes/postRoute");
const app = express();
const cors= require('cors')
app.use(express.json());

dotenv.config();
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use('/backend/uploads/profile', express.static("backend/uploads/profile"))


// setting routes 
app.use("/api/v1/user",userRoute)
app.use("/api/v1/post",postRoute)



const port = process.env.PORT || 4000;
connectDB();

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})