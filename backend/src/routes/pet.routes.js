import { Router } from 'express'
import { PetController } from '../controllers/pet.controller.js'

const petController = new PetController()
export const petRouters = Router()

petRouters.get('/api/pet', petController.getAllPets)
petRouters.post('/api/pet', petController.createPet)
petRouters.get('/api/pet/:cedula', petController.getPet)
petRouters.put('/api/pet/:cedula', petController.updatePet)
petRouters.delete('/api/pet/:cedula', petController.deletePet)
