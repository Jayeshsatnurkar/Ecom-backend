import mongoose, { model } from "mongoose";
import bcrypt from 'bcrypt'

let adminSchema = mongoose.Schema({

  name: String,
  email: String,
  password: String,
  timeStamp: String,
  token: String,
})

adminSchema.pre('save', async function () {

  try {
    this.timeStamp = `${new Date().toLocaleDateString()} || ${new Date().toLocaleTimeString()}`
    console.log("callbefore saving the data")
    //encrypt the user password

    let salt = await bcrypt.genSalt(10)
    console.log(salt)

    let hash = await bcrypt.hash(this.password, salt)
    this.password = hash
  } catch (err) {

    console.log("error in pre method", err)
  }
})

let adminModel = new mongoose.model('admins', adminSchema)

export { adminModel }