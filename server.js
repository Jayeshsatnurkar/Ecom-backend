
import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import './Database/conn.js'

dotenv.config({path:"./config.env"})

import {ApiRouter} from "./routers/apiRouter.js"

let port=process.env.PORT 
let app=express()

let corsOption ={
    origin:'*'
}

app.use(cors(corsOption))

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use(ApiRouter)

app.listen(port,()=>{
    console.log(`server is running on port :${port},https://localhost:${port}`)
})