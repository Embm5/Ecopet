import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Client = sequelize.define('Client', {
  cedula: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(Client, {
  foreignKey: 'cedula',
  sourceKey: 'cedula'
})

Client.belongsTo(Person, {
  foreignKey: 'cedula',
  targetKey: 'cedula'
})
