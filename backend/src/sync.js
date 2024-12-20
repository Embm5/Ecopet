import { sequelize } from './database/connection.js'
import './models/administrator.model.js'
import './models/client.model.js'
import './models/credential.model.js'
import './models/person.model.js'
import './models/veterinary.model.js'
import './models/pet.model.js'
// import './models/cita.model.js'
import { inserts } from './models/insert.js'

try {
  await sequelize.sync({ force: true })
  await inserts()
} catch (error) {
  console.error('Error connecting to the database', error)
}
