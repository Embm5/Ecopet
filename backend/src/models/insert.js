import bcrypt from 'bcrypt'
import { Credential } from './credential.model.js'
import { Administrator } from './administrator.model.js'
import { Person } from './person.model.js'
import { Client } from './client.model.js'

export async function inserts () {
  const newAdmin = [{
    cedula: 122345,
    Primer_nombre: 'Admin',
    Primer_Apellido: 'uno',
    IdRol: 1
  }]

  const newClient = [{
    cedula: 6789,
    Primer_nombre: 'Carlos',
    Segundo_nombre: 'David',
    Primer_Apellido: 'Ramires',
    Segundo_Apellido: 'Marin',
    IdRol: 4
  }, {
    cedula: 1011,
    Primer_nombre: 'Juan',
    Segundo_nombre: 'Pablo',
    Primer_Apellido: 'Perez',
    Segundo_Apellido: 'Gonzalez',
    IdRol: 4
  }]

  const password = await bcrypt.hash('P@ssw0rd', 12)

  const newCredentials = [{
    cedula: newAdmin[0].cedula,
    email: 'admin@gmail.com',
    password
  }, {
    cedula: newClient[0].cedula,
    email: 'cdRamirez@gmail.com',
    password
  }, {
    cedula: newClient[1].cedula,
    email: 'jpPerez@gmail.com',
    password
  }]

  const clientCedulas = newClient.map((x) => ({ cedula: x.cedula }))

  await Person.bulkCreate(newAdmin.concat(newClient))
  await Client.bulkCreate(clientCedulas)
  await Administrator.bulkCreate([{ cedula: newAdmin[0].cedula }])
  await Credential.bulkCreate(newCredentials)
}
