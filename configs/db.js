const  { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodejs-microservice',
    password: 'root',
    port: 5432,
  })
   

   
  const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'nodejs-microservice',
      password: 'root',
      port: 5432,
  })

const run = async()=>{
console.log(await pool.query('SELECT NOW()'))
 
await client.connect()
 
console.log(await client.query('SELECT NOW()'))
 
await client.end()
} 
run()