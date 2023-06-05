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

