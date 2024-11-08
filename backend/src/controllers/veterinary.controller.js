import { Veterinary } from '../models/veterinary.model.js'
import { Credential } from '../models/credential.model.js'
import { Person } from '../models/person.model.js'
import { CredentialController } from './credential.controller.js' // Capitalización corregida

export class VeterinaryController {
  getAllVeterinary = async (req, res) => {
    try {
      const veterinarys = await Veterinary.findAll({
        include: [{
          model: Person,
          include: [{ model: Credential }]
        }]
      })
      res.json(veterinarys)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error getting Administrative Veterinary' })
    }
  }

  createVeterinary = async (req, res) => {
    try {
      const { id, firstName, secondName, lastName1, lastName2, email, password } = req.body
      const doc = id
      const person = await Person.findByPk(doc)
      const cred = await Credential.findOne({ where: { email } })
      if (!person && !cred) {
        const newPerson = await Person.create({
          id: doc,
          firstName,
          secondName,
          lastName1,
          lastName2
        })
        const credentialController = new CredentialController()
        await credentialController.createCredential({ personId: doc, email, password })
        await Veterinary.create({ personId: doc })
        return res.status(201).json({ newPerson })
      }
      return res.status(400).json({ message: 'Account already exists' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message })
    }
  }

  getVeterinary = async (req, res) => {
    try {
      const { id } = req.params
      const veterinary = await Person.findByPk(id)
      if (veterinary) {
        res.json(veterinary)
      } else {
        res.status(404).json({ err: 'Administrative veterinary not found' })
      }
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  deleteVeterinary = async (req, res) => {
    try {
      const { id } = req.params
      await Person.destroy({
        where: {
          id
        }
      })
      res.json({ msg: 'veterinary deleted' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  updateVeterinary = async (req, res) => {
    try {
      const { id } = req.params
      const veterinary = await Person.findByPk(id)
      veterinary.set(req.body)

      await veterinary.save()
      res.status(202).json(veterinary)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }
}
