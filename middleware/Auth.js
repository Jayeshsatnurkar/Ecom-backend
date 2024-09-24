import jwt from 'jsonwebtoken'
import { dataModel } from '../models/dataSchema.js'

let authUser = async (req,res,next) =>{
    try{
        //we are expecting a user token

        let userToken =req.headers.authorization

        if(!userToken){
            throw("no token found !")
        }
        let isUserValid =await jwt.verify(userToken,process.env.jwt_secret_key)

        if(!isUserValid){
            throw('invalid token !')
        }
        console.log(isUserValid)

        let customerData =await dataModel.findOne({email:isUserValid.userId, token:userToken})

         if(!customerData){
            throw("customer not found please register first! ")
         }

         req.userData =customerData
         next()
    }catch(err){
           res.status(401).json({message:"not a valid request !"})
    }
}

export {authUser}