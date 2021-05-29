'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    name: { type: String, required: true, maxlength: 150 },
    username: { type: String, required: true, maxlength: 25, unique: true },
    email: { type: String, required: true, maxlength: 100, unique: true },
    password: { type: String, required: true, maxlength: 100 },
    date_added: { type: Date, required: true, maxlength: 50 },
    date_modified: { type: Date, required: false, maxlength: 50 }
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);