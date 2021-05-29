const express = require('./node_modules/express');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
var dbconnection = require('./middleware/dbconnection'); 

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
// const config = require('./config/config');
// const router = require('./router');
// var dbconnection = require('./middleware/dbconnection'); 

 dbconnection.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
server.listen(PORT, () => console.log(`Server has been started in port: ${PORT}`));
