import { Router } from 'express'
import authRouter from './auth/auth-router'
import { generateResponse } from '../controllers';
import { getMessages, sendMessage } from './messages';
// other routers can be imported here

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.post("/generate", generateResponse);
globalRouter.get("/get-messages", getMessages);
globalRouter.post("/send-message", sendMessage);
// other routers can be added here

export default globalRouter
