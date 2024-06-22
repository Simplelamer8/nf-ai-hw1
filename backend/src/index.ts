import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import bodyParser from 'body-parser'
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000; 

connectDB()

const app = express()

app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use(logger)
app.use('/api/v5', globalRouter)

const server = createServer(app)

server.listen(5000, () => {
  console.log('server running at http://localhost:5000/api/v5')
})
