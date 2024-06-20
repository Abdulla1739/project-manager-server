// import mongoose 
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        requied: true
    },
    email:{
        type: String,
        requied: true,
        unique: true
    },
    password:{
        type: String,
        requied: true
    },
    github:{
        type: String,
    },
    linkedin:{
        type: String,
    },
    profilePic:{
        type: String
    }
})


const users = mongoose.model("user",userSchema)

module.exports = users