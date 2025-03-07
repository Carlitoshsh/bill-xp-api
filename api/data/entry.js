import pg from 'pg';
const { Pool } = pg;

const dbSetup = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    db: process.env.DB_DB,
}

const pool = new Pool({
  user: dbSetup.user,
  password: dbSetup.pass,
  host: dbSetup.host,
  port: 5432,
  database: dbSetup.db
});

export default async function runCommand(sqlCommand) {
  const client = await pool.connect();
  const data = await client.query(sqlCommand);
  await client.release();
  return data.rows;
}