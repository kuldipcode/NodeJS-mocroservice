const {Kafka} = require('kafkajs');
const {client, pool} = require('../configs/db');
const kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
    ssl: false
  });
  
const consumer = kafka.consumer({ groupId: 'my-group' })

const runOtp = async()=>{

await consumer.connect()
await consumer.subscribe({ topics: ['userTopic'] })
await pool.connect()
await consumer.run({
    eachMessage: async ({ message }) => {
        let userJsonStr = message.value.toString()
        let user = JSON.parse(userJsonStr);
        
        let email = user.email;
        let username = user.firstname;
        let mobileno = user.mobileno;
        console.log("consumer user"+ JSON.stringify(user))
     
        const texttable = `
        CREATE TABLE IF NOT EXISTS "users" (
            "id" SERIAL,
            "name" VARCHAR(100) NOT NULL,
            "email" VARCHAR(100) NOT NULL,
            "mobileno" NUMERIC(10) NOT NULL,
            PRIMARY KEY ("id")
        );`
        const result = await pool.query(texttable);

        const text = 'INSERT INTO users(name, email,mobileno) VALUES($1, $2, $3) RETURNING *'
        const values = [username, email, mobileno]
    
        const res = await pool.query(text, values)
        
               
    }
})
}

module.exports = {runOtp}