import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import { productModel } from '../models/productSchema'

dotenv.config({path:'./config.env'})

let connection = async()=>{

    try{
 
         await mongoose.connect(process.env.MONGODBSTRING)
    console.log("Database is successfully connected !")
    }catch(err){
             console.log("unable to connect ",err)
    }

}

// const newProduct = new productModel({
//     name:"iphone 16",
//     description:"Latest smart with amazing features",
//     _id:"p1",
//     qty:"2",
//     category:"mobile",
//     price:"10000",
//     ratings:"4.4"
// })

// newProduct.save().then((productModel)=>{
//     console.log("product saved !",productModel)
// }).catch((err)=>{
//     console.log("unable to save product",err)
// })

connection()