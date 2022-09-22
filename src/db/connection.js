const mongoose = require("mongoose")
//creating database
mongoose.connect("mongodb://localhost:27017/Akash_Dynamic",
{useNewUrlParser:true,
    useunifiedTopology:true}).then(()=>{
        console.log("Mongodb connected successfully !");
    }).catch((e)=>{
        console.log(`Error : ${e}`);
    })