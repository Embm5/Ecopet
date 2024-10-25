import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Veterinary = sequelize.define('Veterinary', {
  personId: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(Veterinary, {
  foreignKey: 'personId',
  sourceKey: 'id'
})

Veterinary.belongsTo(Person, {
  foreignKey: 'personId',
  targetKey: 'id'
})
