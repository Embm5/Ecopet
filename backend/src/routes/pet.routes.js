import { Router } from 'express'
import { PetController } from '../controllers/pet.controller.js'

const petController = new PetController()
export const petRouters = Router()

petRouters.get('/api/pet', petController.getAllPets)
petRouters.post('/api/pet', petController.createPet)
petRouters.get('/api/pet/:id', petController.getPet)
petRouters.put('/api/pet/:id', petController.updatePet)
petRouters.delete('/api/pet/:id', petController.deletePet)
petRouters.get('/api/pet/byowner/:ownerId', petController.getPetByOwnerId)