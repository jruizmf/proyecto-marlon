var mongoose = require('mongoose'); 
const config = require('../config/config');
//Creamos la conexión con mongo
exports.connect = function() {

    mongoose.set('useFindAndModify', false);
    
    mongoose.connect(config.db_connection, 
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("La conexión a la base de datos se ha realizado correctamente")
    })
    .catch(err => console.log(err));
}