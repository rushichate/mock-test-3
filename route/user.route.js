const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")


userRouter.post("/register",async(req,res)=>{
     const {name,email,password,isAdmin} = req.body
    try{

        const hasPassword = bcrypt.hashSync(password,5)
        const newUser = new UserModel({name,email,password:hasPassword,isAdmin})
        await newUser.save()
        res.status(201).json({message:"User Registered Successfully"})

    }catch(error){
        res.status(400).json({message:error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
        const isEmailValid = await UserModel.findOne({email})
        if(!isEmailValid){
            return res.status(201).json({message:"Please enter valid email"})
        }

        const isPasswordValid = bcrypt.compareSync(password,isEmailValid.password)
        if(!isPasswordValid){
            return res.status(201).json({message:"Wrong Credentials"})
        }
        const token = jwt.sign({isAdmin:isEmailValid.isAdmin},"masai")
        res.status(201).json({message:"User Login Successful",token:token})
    }catch(error){
        res.status(400).json({message:error})
    }
})



module.exports ={
    userRouter
}