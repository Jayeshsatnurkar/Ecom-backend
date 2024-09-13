import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path:'./config.env'})

let connection = async()=>{

    try{
 
         await mongoose.connect(process.env.MONGODBSTRING)
    console.log("Database is successfully connected !")
    }catch(err){
             console.log("unable to connect ",err)
    }

}

connection()