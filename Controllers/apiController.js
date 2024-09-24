import { generateToken } from '../middleware/generateToken.js'
import { dataModel} from '../models/dataSchema.js'
import { adminModel } from '../models/adminSchema.js'
import { productModel } from '../models/productSchema.js'
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
        res.status(400).json({ messege: err })
    }
}

let LoginForm = async(req,res)=>{
   
    try{
        let userData=req.body
        
        let checkEntry =await dataModel.findOne({email:userData.email})
        //if user exists the checkEntry will have object from database
       // console.log(checkEntry)
        if(!checkEntry){
            throw ("User email does not exists !")
        }
        //compare password with encrypted password

        let result = await bcrypt.compare(userData.password,checkEntry.password)
       // console.log(result)

        if(!result){
            throw ("wrong email or password!")
        }
        
        let token = await generateToken(checkEntry.email)
        console.log(token)
       
        res.status(202).json({messege:"user login is successfull","i am ":checkEntry.email,token:token})
    }catch(err){

        console.log("unable to login !",err)
        res.status(400).json({messege:err})
    }
}

let FetchData = async (req, res) => {
    // console.log("FetchData is called !")
    try {
        let result = await dataModel.find({})

        if (result.length == 0) {
            throw ("unable to get data")
        }
        res.status(200).json({ message: "Get the data from database", database: result })
    } catch (err) {
        res.status(400).json({ message: "unable to get data", err })
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

let adminData= async(req,res)=>{
    let data = req.body
    console.log(data)
    try {
        let checkIfUnique = await adminModel.findOne({ $or: [{ name: data.name }, { email: data.email }] })

        if (checkIfUnique) {
            throw ('User already exists !')
        } else {

            let instanceDataModel = new adminModel(data)

            await instanceDataModel.save()

            res.status(200).json({ messege: "data has been saved into database !" })
        }
    } catch (err) {
        console.log("unable to save data into database", err)
        res.status(400).json({ messege: err })
    }
}

let  adminLogin = async(req,res)=>{
    try{
        let data = req.body
            console.log(data)
        let check = await adminModel.findOne({email:data.email})

        if(!check){
            throw ("User email does not exists !")
        }
        let result = await bcrypt.compare(data.password,check.password)
        // console.log(result)
 
         if(!result){
             throw ("wrong email or password!")
         }
        
         let token = await generateToken(check.email)
         console.log(token)
        
         res.status(202).json({messege:"admin login is successfull","i am ":check.email,token:token})
    }catch(err){
        
    }
}

let productData =async(req,res)=>{
    let data =req.body
    try{
        
        const saveProduct = new productModel(data)

        await saveProduct.save()
        
        res.status(201).json(saveProduct)
    }catch(err){
        console.log("unable to save product in database !")
        res.status(400).json({message:err})
    }
}

export {PostAcceptForm,LoginForm,FetchData,clientDashboard,adminData,adminLogin,productData}