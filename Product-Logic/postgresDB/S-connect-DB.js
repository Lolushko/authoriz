import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.POSTGRES_DB_DATABASE,
  process.env.POSTGRES_DB_USER,
  process.env.POSTGRES_DB_PASSWORD,
  {
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    logging: (msg)=>console.log(msg),
    dialect: 'postgres',
  }
)

export default db
