import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

import { Credential } from '../models/credential.model.js'
import { Person } from '../models/person.model.js'
import { Veterinary } from '../models/veterinary.model.js'
import { Client } from '../models/client.model.js'
import { Administrator } from '../models/administrator.model.js'

export class CredentialController {
  getAllCredentials = async (req, res) => {
    try {
      const cred = await Credential.findAll({
        include: Person
      })
      res.json(cred)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  createCredential = async ({ cedula, email, password }) => {
    try {
      const cryptedPassword = await bcrypt.hash(password, 12)
      const newCred = await Credential.create({ cedula, email, password: cryptedPassword })
      return newCred
    } catch (error) {
      return { message: error.message }
    }
  }

  getCredential = async (req, res) => {
    try {
      const { cedula } = req.params
      const cred = await Credential.findByPk(cedula)
      if (cred) {
        res.json(cred)
      } else {
        res.status(404).json({ err: 'Credential not found' })
      }
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  getCredentialByEmail = async (req, res) => {
    try {
      const { email } = req.body
      const cred = await Credential.findOne({
        where: {
          email: { [Op.iLike]: email }
        }
      })
      if (!cred) {
        return res.status(404).json({ err: 'Email is not registered' })
      }

      const rol = await getRol({ cedula: cred.cedula })
      if (rol !== 'client') {
        return res.status(401).json({ err: 'Permissions denied' })
      }

      return res.json(cred)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  checkEmailExistence = async (req, res) => {
    try {
      const { email } = req.params
      const cred = await Credential.findOne({
        where: {
          email: { [Op.iLike]: email }
        }
      })
      if (!cred) {
        return res.json(null)
      }
      return res.json(cred)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteCredential = async (req, res) => {
    try {
      const { cedula } = req.params
      await Person.destroy({
        where: {
          cedula
        }
      })
      res.json({ msg: 'Credential deleted' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  updateCredential = async (req, res) => {
    try {
      const { cedula } = req.params
      const { email, password } = req.body
      const cred = await Credential.findByPk(cedula)
      if (cred) {
        if (email) {
          cred.email = email
        }
        if (password) {
          cred.password = await bcrypt.hash(password, 12)
        }
        await cred.save()
        return res.status(202).json(cred)
      }
      return res.status(404).json({ err: 'Credential not found' })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  updatePassword = async (req, res) => {
    try {
      const { email, password } = req.body
      const cred = await Credential.findOne({
        where: {
          email: { [Op.iLike]: email }
        }
      })
      const eq = await bcrypt.compare(password, cred.password)
      if (eq) {
        return res.status(200).json({ msg: 'The password is the same as the currently stored password. No changes have been made.' })
      }
      const rol = await getRol({ cedula: cred.cedula })
      if (rol !== 'client') {
        return res.status(401).json({ err: 'Permissions denied' })
      }
      cred.password = await bcrypt.hash(password, 12)
      await cred.save()
      return res.status(202).json(cred)
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }

  login = async (req, res) => {
    try {
      const { email, password, hashed } = req.body
      const cred = await Credential.findOne({
        where: {
          email: {
            [Op.iLike]: email
          }
        }
      })
      if (!cred) {
        return res.status(400).json({ err: 'Email is not registered' })
      }
      const eq = hashed ? (password === cred.password) : await bcrypt.compare(password, cred.password)
      if (!eq) {
        return res.status(401).json({ err: 'Password incorrect' })
      }
      const rol = await getRol({ cedula: cred.cedula })
      const token = createToken({ data: { email: cred.email, rol, cedula: cred.cedula } })
      return res.json({ token, rol , cedula: cred.cedula })
    } catch (error) {
      return res.status(500).json({ mesaage: error.message })
    }
  }
}
async function getRol ({ cedula }) {
  const admin = await Administrator.findByPk(cedula)
  if (admin) {
    return 1
  }
  const client = await Client.findByPk(cedula)
  if (client) {
    return 4
  }
  const veterinary = await Veterinary.findByPk(cedula)
  if (veterinary) {
    return 2
  }
}

function createToken ({ data }) {
  const payLoad = {
    email: data.email,
    rol: data.rol,
    cedula: data.cedula
  }
  return jwt.sign(payLoad, process.env.SECRET_KEY)
}
