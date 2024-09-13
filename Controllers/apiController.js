import { generateToken } from '../middleware/generateToken.js'
import { dataModel} from '../models/dataSchema.js'
import { generateToken } from '../middleware/generateToken.js'
import bcrypt from 'bcrypt'


let PostAcceptForm = async (req, res) => {

    let data = req.body
    console.log(data)
    try {
        let checkIfUnique = await dataModel.findOne({ $or: [{ phone: data.phone }, { email: data.email }] })

        if (checkIfUnique) {
            throw ('User already exists !')
        } else {


            let instanceDataModel = new dataModel(data)

            await instanceDataModel.save()

            res.status(200).json({ messege: "data has been saved into database !" })
        }
    } catch (err) {
        console.log("unable to save data into database", err)
        res.status(200).json({ messege: err })
    }
}

let LoginForm= async(req,res)=>{
    let userData=req.body
        //data ={email, password}
        //console.log(data)
    try{
        
        let checkEntry =await dataModel.findOne({email:userData.email})
        //if user exists the checkEntry will have object from database
           console.log(checkEntry)
        if(!checkEntry){
            throw ("User email does not exists !")
        }
        //compare password with encrypted password

        let  result =  await bcrypt.compare(userData.password,checkEntry.password)

        if(!result){
            throw ("wrong email or password!")
        }

        let token =await generateToken(checkEntry.email)
        console.log(token)
        res.status(202).json({messege:"user login is successfull","i am ":checkEntry.email,token:token})
    }catch(err){

        console.log("unable to login !",err)
        res.status(400).json({messege:err})
    }
}

let clientDashboard = async (req,res) =>{
    try{
        let userData=req.userData
        console.log("welcome !",req.userData.name)
        console.log("dashboard access granted !")

        res.status(200).json({messege:` welcome ! ${userData.name}`,userData})
    }catch(err){
        res.status(400).json({message:"something went wrong",err})
    }
}

export {PostAcceptForm,LoginForm,clientDashboard}