import bcrypt from 'bcrypt'
import { Credential } from './credential.model.js'
import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'

export async function inserts () {
  const newAdmin = {
    cedula: 122345,
    Primer_nombre: 'Admin',
    Primer_Apellido: 'uno',
    IdRol: 1
  }
  const password = await bcrypt.hash('P@ssw0rd', 12)
  const newCredentials = {
    cedula: newAdmin.cedula,
    email: 'admin@gmail.com',
    password
  }
  await Person.create(newAdmin)
  await Administrator.create({ cedula: newAdmin.cedula })
  await Credential.create(newCredentials)
}
