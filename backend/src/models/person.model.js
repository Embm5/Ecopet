import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const Person = sequelize.define('Person', {
  cedula: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    validate: {
      isNumeric: true
    }
  },
  Primer_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  Segundo_nombre: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]*$/i
    }
  },

  Primer_Apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  Segundo_Apellido: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/i
    }
  },
  IdRol: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})
