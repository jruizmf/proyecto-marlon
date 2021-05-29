'use strict'
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user');

exports.getAll = async function(req, res){
  
    if(Object.keys(req.query).length === 0){
        User.find().then(u => {
            res.status(200).send(u);
        }).catch(err => {
           return  res.status(403).send({
                message: err.message || "No encontrados."
            });
        });
    }
    else{
        var query =  req.query ;
        var sort = "name";
        var page = 1;
        var limit = 100;
        if(req.query.sort !== 'undefined'){
            sort = query.sort;
            delete query.sort;   
        }
        if(req.query.page !== 'undefined'){
            page = query.page;
            delete query.page;   
        }
        if(req.query.limit !== 'undefined'){
            limit = query.limit;
            delete query.limit;   
        }
        console.log(limit);
        console.log(sort);
        
        
        User.find(query).sort(sort).skip((parseInt(page)-1)*parseInt(limit)).limit(parseInt(limit)).then(u => {
            return res.send(u);
            
        }).catch(err => {
           return  res.status(500).send({
                message: err.message || "Some error soccurred while retrieving users."
            });
        });
    }
}

// Conseguir datos de un usuario
exports.findOne = function(req, res){
    
    User.findById(req.params.userId).then(x => { 
        if(x == null)
            return res.status(204).send({
                message:  "There is no users with ID:" + req.params.userId
            });

        return res.send(x);
        
        }).catch(err => {
           return  res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.addUser = async  function(req, res){
    try{
        const { body } = req;
    
            body.date_added = Date.now();
            const user =  await User.create(body);
            console.log(user)
            return res.status(200).send({
                user,
                message: "User added succesfully"
            });   
    }
    catch(e){
        console.log(e);
        return res.status(500).send({message: 'Error en la petición', error: e});
    }
}

exports.updateUser = async function(req, res){
    // Validate Request
    if(!req.params.userId ) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    console.log(req.body.password)
    
    req.body.date_modified = Date.now();

    User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true, useFindAndModify: false})
    .then(x => {
        console.log(x)
        
        if(!x) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        
        return res.send(x);

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        console.log(err);
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
}
exports.deleteUser = function(req, res) {
    var query = { _id: req.params.userId };

    User.remove(query, function(err, obj) {
        if (err){
            return res.send({
                message: "User not deleted " + req.params.userId +" Please Check"+ err
            }); 
        }
        return res.send({
            message: "User deleted " + req.params.userId
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    }); 
    
}