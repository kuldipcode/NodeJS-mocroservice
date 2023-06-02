require('dotenv').config()
const dbConnect = require('./configs/db');
const express = require('express');
const {kafka} = require('./configs/kfk');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoute = require('./routes/users');
const app = express();
const userStub = {
    _id: '6479a43fe433071c792fc3b0',
    firstname: 'Kuldipkumar',
    lastname: 'Prajapati',
    email: 'kuldip.code@gmail.com',
    profileimage: 'pathtoURL',
    password: 'tempPass',
    mobileNo: 9979193449
  }
app.use(bodyParser.json());
app.use(cors());
app.get('/api',function(req, res){
    console.log(process.env.dbUrl)
    res.send('It Works')
})

app.use('/api/user', usersRoute);
app.listen(3001, async ()=>{
    await dbConnect.then(data=>{console.log(`DB Connected at:`)})
    
const consumer = kafka.consumer({ groupId: 'my-group' })
  await consumer.connect()
    await consumer.subscribe({ topics: ['userTopic'] })
    await consumer.run({ eachMessage: async ({ message }) => {
       let userJsonStr = message.value.toString()
       let user = JSON.parse(userJsonStr)
       console.log(user);
    }})
    .catch(err=>{console.log(err)});
    console.log("mass service started at")
})