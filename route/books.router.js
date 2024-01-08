const express = require("express")
const { BookModel } = require("../model/books.model")
const { auth } = require("../middleware/authorization")
const bookRouter = express.Router()


bookRouter.get("/",async(req,res)=>{
    try{
        const query = {}
        if(req.query.category){
            query.category = req.query.category
        }
        if(req.query.author){
            query.author=req.query.author
        }
        const books = await BookModel.find(query)

        if(!books){
            return res.status(200).json({message:"No Books to show"})
        } 
        res.status(200).json(books)

    }catch(error){
        res.status(400).json({message:error})
    }
})

bookRouter.get("/:id",async(req,res)=>{
    const {id} = req.params
    try{
        const books = await BookModel.findById(id)
        
        if(!books){
            return res.status(200).json({message:"Book not Found"})
        } 
        res.status(200).json(books)

    }catch(error){
        res.status(400).json({message:error})
    }
})

bookRouter.delete("/:id",auth, async(req,res)=>{
    const {id} = req.params
    const {userIsAdmin} = req.body
    try{

        if(!userIsAdmin){
            return res.status(202).json({message:"Only admin can do this opration"})
        }
         const deletBook =  await BookModel.findByIdAndDelete(id)

         if(!deletBook){
            res.status(202).json({message:"Book Not Found"})
         }

        res.status(202).json({message:"Book Deleted"})

    }catch(error){
        res.status(400).json({message:error})
    }
})

bookRouter.put("/:id",auth,async(req,res)=>{
    const {id} = req.params
    const {userIsAdmin} = req.body
    try{
        if(!userIsAdmin){
            return res.status(204).json({message:"Only admin can do this opration"})
        }

        const updatedBook = await BookModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedBook){
          return  res.status(204).json({message:"Book Not Found"})
        }
        res.status(204).json({message:"Book Updated",book:updatedBook})

    }catch(error){
        res.status(400).json({message:error})
    }
})

bookRouter.post("/",auth,async(req,res)=>{
    const {userIsAdmin,title,author,category,price,quantity} = req.body
    try{
        if(!userIsAdmin){
            return res.status(201).json({message:"Only admin can do this opration"})
        }
        const newBook = new BookModel({title,author,category,price,quantity})
        newBook.save()
        res.status(201).json({message:"Book Added",book:newBook})

    }catch(error){
        res.status(400).json({message:error})
    }
})


module.exports ={
    bookRouter
}