import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { clientRouters } from './routes/client.routes.js'
import { veterinaryRouters } from './routes/veterinary.routes.js'
import { credentialRouters } from './routes/credential.routes.js'
import { petRouters } from './routes/pet.routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.use(clientRouters)
app.use(veterinaryRouters)
app.use(credentialRouters)
app.use(petRouters)
