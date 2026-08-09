require("dotenv").config()
const mongoose = require("mongoose")
const User = require("../models/data")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function handleLogin(req,res){
    try {
        
        const {email,password} = req.body
        const user = await User.findOne({email})
          
        if(!user){
           return res.status(401).json({msg:"Invalid email and password"})
           
        }

        const matchUserPassword = await bcrypt.compare(password,user.password)
        if(!matchUserPassword){
           return res.status(401).json({msg:"Invalid password"})
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_KEY,
            {expiresIn:"7d"}
        )

        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"none",
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({msg:"Successfully Login",user:{
            id:user._id,
            name:user.name,
            email:user.email
           }})

    } catch (err) {
        console.log(err)
        res.status(500).json({msg:"Internal server error"})
        
    }
    
}

async function handleRegister(req,res){
    try {
        console.log("body",req.body)
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({msg:"All fields are Required"})
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(409).json({msg:"Email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const result = await User.create({
            name: name,
            email: email,
            password:hashedPassword
        })

        res.status(201).json({msg:"successfully created"})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:"Internal server error"})
    }
}

async function handleLogout(req,res){
    try {
       res.clearCookie("token",
        {
            httpOnly:true,
            sameSite:"none",
            secure:true,
        }
        )

        res.status(201).json({msg:"Logout successfully"})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:"Internal server error"})
    }
}

async function handleUser(req,res){
     try {
        res.status(200).json({
            authenticated : true,
            user:req.user
        })     
     } catch (err) {
        console.log(err)
        res.status(500).json({msg:"Internal server error"})       
     }
}


module.exports = {handleLogin, handleRegister, handleLogout, handleUser}