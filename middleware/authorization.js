
const jwt = require("jsonwebtoken")



const auth = async (req,res,next)=>{
    const token = req.headers.authorization
    if(!token){
        return res.status(200).json({message:"Wrong token please login first"})
    }

    jwt.verify(token,"masai",function(error,decoded){
        if(error){
            return res.status(200).json({message:"Wrong token please login first"})
        }else{
            req.body.userIsAdmin = decoded.isAdmin
            next()
        }
    })
}

module.exports ={
    auth
}