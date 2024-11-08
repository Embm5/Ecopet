import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'
export const Pet = sequelize.define('Pet', {
  mascotaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tamanio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
Client.hasMany(Pet, {
  foreignKey: 'cedula',
  sourceKey: 'cedula'
})

Pet.belongsTo(Client, {
  foreignKey: 'cedula',
  targetKey: 'cedula'
})
