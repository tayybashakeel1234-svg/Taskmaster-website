import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taskmaster_db',
  password: 'Tayyba@12345',
  port: 5432,
})

export default pool
