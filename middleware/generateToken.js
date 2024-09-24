import dotenv from "dotenv"
import jwt from 'jsonwebtoken'
import { dataModel} from '../models/dataSchema.js'

dotenv.config({path:"./config.env"})
let generateToken = async (user) => {
    try{

        let options = {
            expiresIn : "1hr"
        }

        let payload = {
            userId : user
        }

        let token = await jwt.sign(payload, process.env.jwt_secret_key,options)

        // store token in database for further check !

        if(!token){
            throw("unable to generate token !")
        }

        
        let result = await dataModel.updateOne({ email: user } , {$set:{ token : token } })
            
        return token

    }catch(err){
        console.log("error while generating a token ! " , err)
    }
    
}

export {generateToken}