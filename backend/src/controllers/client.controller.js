/* eslint-disable camelcase */
import { Client } from '../models/client.model.js'
import { Credential } from '../models/credential.model.js'
import { Person } from '../models/person.model.js'
import { Veterinary } from '../models/veterinary.model.js'
import { CredentialController } from './credential.controller.js' // Capitalización corregida

export class ClientController {
  getAllClient = async (req, res) => {
    try {
      const clients = await Person.findAll({
        include: [{
          model: Credential
        }]
      })
      res.json(clients)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error getting Administrative client' })
    }
  }

  createClient = async (req, res) => {
    try {
      const { IdRol, cedula, Primer_nombre, Segundo_nombre, Primer_Apellido, Segundo_Apellido, email, password } = req.body
      const doc = cedula
      const person = await Person.findByPk(doc)
      const cred = await Credential.findOne({ where: { email } })
      if (!person && !cred) {
        const newPerson = await Person.create({
          cedula,
          Primer_nombre,
          Segundo_nombre,
          Primer_Apellido,
          Segundo_Apellido,
          IdRol

        })
        const credentialController = new CredentialController()
        await credentialController.createCredential({ cedula, email, password })
        if (IdRol === 4) {
          await Client.create({ cedula })
        } else {
          await Veterinary.create({ cedula })
        }
        return res.status(201).json({ newPerson })
      }
      return res.status(400).json({ message: 'Account already exists' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message })
    }
  }

  getClient = async (req, res) => {
    try {
      const { id } = req.params
      const client = await Person.findByPk(id)
      if (client) {
        res.json(client)
      } else {
        res.status(404).json({ err: 'person not found' })
      }
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  deleteClient = async (req, res) => {
    try {
      const { cedula } = req.params
      await Person.destroy({
        where: {
          cedula
        }
      })
      res.json({ msg: 'client deleted' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  updateClient = async (req, res) => {
    try {
      const { id } = req.params
      const client = await Person.findByPk(id)
      client.set(req.body)

      await client.save()
      res.status(202).json(client)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }
}
