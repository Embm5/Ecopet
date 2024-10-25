import { Router } from 'express'
import { VeterinaryController } from '../controllers/veterinary.controller.js'

const veterinaryController = new VeterinaryController()
export const veterinaryRouters = Router()

veterinaryRouters.get('/api/veterinary', veterinaryController.getAllVeterinary)
veterinaryRouters.post('/api/veterinary', veterinaryController.createVeterinary)
veterinaryRouters.get('/api/veterinary/:id', veterinaryController.getVeterinary)
veterinaryRouters.put('/api/veterinary/:id', veterinaryController.updateVeterinary)
veterinaryRouters.delete('/api/veterinary/:id', veterinaryController.deleteVeterinary)
