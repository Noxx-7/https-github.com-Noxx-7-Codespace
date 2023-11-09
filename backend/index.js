const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


const app = express()
const port = 5000;

app.use(cors())
app.use(express.json());   
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/data',require('./routes/Data'));
app.listen(port, () => {
  console.log(`The server is running on ${port}`)
})


