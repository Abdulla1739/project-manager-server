const mongoose = require("mongoose")

const connetcion_string = process.env.CONNECTION_STRING


mongoose.connect(connetcion_string).then((res)=>{
    console.log("MongoDB Atlas connected with pfserve");
}).catch((err)=>{
    console.log("conncetion failed");
    console.log(err);
})