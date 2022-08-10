import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  user: process.env.PSQL_DB_USER,
  password: process.env.PSQL_DB_PASSWORD,
  host: process.env.PSQL_DB_HOST,
  port: process.env.PSQL_DB_PORT,
  database: process.env.PSQL_DB_DATABASE
})



export default pool