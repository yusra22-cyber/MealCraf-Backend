require("dotenv").config()
const jwt = require("jsonwebtoken")

function verficationToken(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({msg:"Unauthorized"})
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_KEY)
        req.user = decode
        next()
    } catch (err) {
        return res.status(401).json({msg:"invalid token"})
    }
}

module.exports = {verficationToken}