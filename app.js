require('dotenv').config()
const express = require('express');
const  {runOtp} = require('./routes/otp');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/api', function (req, res) {
    console.log(process.env.dbUrl)
    res.send('It Works')
})

app.listen(3001, async () => {
    runOtp().catch(console.error);
})