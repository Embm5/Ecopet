import { Pet } from '../models/pet.model.js'
import { Client } from '../models/client.model.js'

export class PetController {
  getAllPets = async (req, res) => {
    try {
      const pets = await Pet.findAll({
        include: [{
          model: Client
        }]
      })
      res.json(pets)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error getting pets' })
    }
  }

  createPet = async (req, res) => {
    try {
      const { nombre, edad, especie, raza, color, tamanio, peso, personId } = req.body
      const client = await Client.findByPk(personId)
      if (client) {
        const newPet = await Pet.create({
          nombre,
          edad,
          especie,
          raza,
          color,
          tamanio,
          peso,
          personId
        })
        return res.status(201).json(newPet)
      }
      return res.status(400).json({ message: 'Client not found' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message })
    }
  }

  getPet = async (req, res) => {
    try {
      const { id } = req.params
      const pet = await Pet.findByPk(id, {
        include: [{ model: Client }]
      })
      if (pet) {
        res.json(pet)
      } else {
        res.status(404).json({ message: 'Pet not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deletePet = async (req, res) => {
    try {
      const { id } = req.params
      await Pet.destroy({
        where: { mascotaId: id }
      })
      res.json({ message: 'Pet deleted' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  updatePet = async (req, res) => {
    try {
      const { id } = req.params
      const pet = await Pet.findByPk(id)
      if (pet) {
        pet.set(req.body)
        await pet.save()
        res.status(202).json(pet)
      } else {
        res.status(404).json({ message: 'Pet not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
