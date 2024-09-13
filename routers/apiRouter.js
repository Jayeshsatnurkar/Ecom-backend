import express from 'express'

import {PostAcceptForm,LoginForm,clientDashboard} from '../Controllers/apiController.js'
import { authUser } from '../middleware/Auth.js'
let ApiRouter=express()


ApiRouter.post("/acceptform",PostAcceptForm)
ApiRouter.post("/LoginForm",LoginForm)
ApiRouter.get("/dashboard",authUser,clientDashboard)

export {ApiRouter}