import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'
import { Client } from './client.model.js'
export const Pet = sequelize.define('Pet', {
  mascotaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Especie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Raza: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Tamanio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Peso: {
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
