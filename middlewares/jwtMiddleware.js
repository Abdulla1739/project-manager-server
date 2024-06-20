const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token){
       
       try {
        const tokenResponse = jwt.verify(token,process.env.JWT_PASSWORD )
       console.log(tokenResponse);
       req.payload = tokenResponse.userId
        next()
       } catch (err) {
        res.status(401).json("Invalid token... Please Login")
        
       }

    }else{
        res.status(404).json("Missing Token!!!")
    }
}

module.exports = jwtMiddleware