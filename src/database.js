import { Sequelize } from 'sequelize'
import { fileURLToPath } from 'node:url'

const databasePath = fileURLToPath(
  new URL('../database.sqlite', import.meta.url)
)

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
  logging: false
})