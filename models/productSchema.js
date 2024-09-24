import mongoose, { model } from "mongoose";

let productSchema = mongoose.Schema({

  name: String,
  description: String,
  _id: String,
  qty: Number,
  category:String,
  price: Number,
  ratings:Number,
  timeStamp: String,
})

let productModel = new mongoose.model('products', productSchema)

export { productModel }