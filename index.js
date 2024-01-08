const express = require("express")
const { connectionDB } = require("./db/db")
const { userRouter } = require("./route/user.route")
const { bookRouter } = require("./route/books.router")
const { orderRouter } = require("./route/order.router")
const app = express()
require("dotenv").config()

app.use(express.json())

app.get("/",(req,res)=>{
    res.json("Welcome To Masai Library")
})
app.use("/users",userRouter)
app.use("/books",bookRouter)
app.use("/orders",orderRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connectionDB
        console.log("Connected to DB Running on port 3000")
    }catch(error){
        console.log(error)
    }
})