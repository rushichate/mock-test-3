const express = require("express")
const { auth } = require("../middleware/authorization")
const { OrderModel } = require("../model/order.model")
const orderRouter = express.Router()

orderRouter.get("/",auth, async(req,res)=>{
    try{
        const orders = await OrderModel.find()
        res.status(200).json(orders)

    }catch(error){
        res.status(400).json({message:error})
    }
})

orderRouter.post("/",auth,async(req,res)=>{
    try{
        const { user, books, totalAmount } = req.body;

        const newOrder = new OrderModel({user, books, totalAmount})
        newOrder.save()
        res.status(201).json({message:"Order Created"})

    }catch(error){
        res.status(400).json({message:error})
    }
})


module.exports = {
    orderRouter
}