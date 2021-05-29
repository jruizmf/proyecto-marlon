const express = require('./node_modules/express');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
var dbconnection = require('./middleware/dbconnection'); 
var userRoutes = require('./routes/user'); 

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
dbconnection.connect();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes);

server.listen(PORT, () => console.log(`Server has been started in port: ${PORT}`));
