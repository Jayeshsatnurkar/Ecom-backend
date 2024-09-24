import mongoose,{model} from "mongoose";
import bcrypt from 'bcrypt'

let dataSchema = mongoose.Schema({

    name:String,
    phone:String,
    email:String,
    city:String,
    pincode:Number,
    age:Number,
    address:String,
    dob:String,
    password:String,
    timeStamp:String,
    token:String
})

 dataSchema.pre('save', async function(){

      try{
    this.timeStamp =`${new Date().toLocaleDateString()} || ${new Date().toLocaleTimeString()}`
    console.log("callbefore saving the data")
    //encrypt the user password

     let salt =await bcrypt.genSalt(10)
     console.log(salt)

     let hash = await bcrypt.hash(this.password,salt)
      this.password = hash
      }catch(err){
        
        console.log("error in pre method",err)
      }
 })
let  dataModel= new mongoose.model('datas',dataSchema)

export{dataModel}