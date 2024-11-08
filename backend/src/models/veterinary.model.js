import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Veterinary = sequelize.define('Veterinary', {
  cedula: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(Veterinary, {
  foreignKey: 'cedula',
  sourceKey: 'cedula'
})

Veterinary.belongsTo(Person, {
  foreignKey: 'cedula',
  targetKey: 'cedula'
})
