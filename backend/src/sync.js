import { sequelize } from './database/connection.js'
import './models/administrator.model.js'
import './models/client.model.js'
import './models/credential.model.js'
import './models/person.model.js'
import './models/veterinary.model.js'

try {
  await sequelize.sync({ force: true })
} catch (error) {
  console.error('Error connecting to the database', error)
}
