import express from 'express'

import {PostAcceptForm,LoginForm,FetchData,clientDashboard,adminData,adminLogin,productData} from '../Controllers/apiController.js'
import { authUser } from '../middleware/Auth.js'
let ApiRouter=express()

ApiRouter.post("/acceptform",PostAcceptForm)
ApiRouter.post("/LoginForm",LoginForm)
ApiRouter.post("/admin",adminData)
ApiRouter.post("/adminLogin",adminLogin)
ApiRouter.post("/products",productData)
ApiRouter.get("/fetchData",FetchData)
ApiRouter.get("/dashboard",authUser,clientDashboard)

export {ApiRouter}