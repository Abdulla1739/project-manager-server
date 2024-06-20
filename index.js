// Loads .env file contents into process .env by default
require ('dotenv').config()

//for importing express
const express = require('express')
//for importing cors
const cors = require("cors")


// need to import the router from router  folder
const router = require("./routes/router")

require("./db/connections")


// creating express server
const pfServer = express()


pfServer.use(cors())
pfServer.use(express.json())  
pfServer.use('/uploads',express.static("./uploads"))  


// router need to give only after the parse or json 
pfServer.use(router)


const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Projects Fairs Server started at port : ${PORT}`);
})

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Project Manager started and awaited </h1>`)
})