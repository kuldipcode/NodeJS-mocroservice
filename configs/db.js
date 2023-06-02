const  { Pool, Client } = require('pg')
module.exports.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodejs-microservice',
    password: 'root',
    port: 5432,
  })
   

module.exports.client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'nodejs-microservice',
      password: 'root',
      port: 5432,
  })

const run = async()=>{
console.log(await pool.query('SELECT NOW()'))
 
await client.connect()
const texttable = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "email" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`
    const result = await client.query(texttable); 
    console.log(result.rows[0])   
const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']
 
const res = await client.query(text, values)
console.log(res.rows[0])
console.log(await client.query('SELECT NOW()'))
 
await client.end()
} 
