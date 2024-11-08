import { Router } from 'express'
import { ClientController } from '../controllers/client.controller.js'

const clientController = new ClientController()
export const clientRouters = Router()

clientRouters.get('/api/client', clientController.getAllClient)
clientRouters.post('/api/client', clientController.createClient)
clientRouters.get('/api/client/:cedula', clientController.getClient)
clientRouters.put('/api/client/:cedula', clientController.updateClient)
clientRouters.delete('/api/client/:cedula', clientController.deleteClient)
