import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Person } from './person.model.js'

export const Credential = sequelize.define('Credential', {
  cedula: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Person.hasOne(Credential, {
  foreignKey: 'cedula',
  sourceKey: 'cedula'
})

Credential.belongsTo(Person, {
  foreignKey: 'cedula',
  targetKey: 'cedula'
})
