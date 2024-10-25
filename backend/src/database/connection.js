import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('ECOPET_DB', 'CRMWU', '1234', {
  host: 'localhost',
  dialect: 'postgres'
})
