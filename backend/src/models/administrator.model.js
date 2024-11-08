import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Administrator = sequelize.define('Administrator', {
  cedula: {
    type: DataTypes.BIGINT,
    primaryKey: true
  }
})

Person.hasOne(Administrator, {
  foreignKey: 'cedula',
  sourceKey: 'cedula'
})

Administrator.belongsTo(Person, {
  foreignKey: 'cedula',
  targetKey: 'cedula'
})
