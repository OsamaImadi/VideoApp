const mongoose = require('mongoose');
const winston = require('winston');
const config = require('../config/custom-environment-variables.json')


module.exports = function(){
    mongoose.connect('mongodb+srv://clusterUser:123abc@vidly-x1n7u.mongodb.net/test?retryWrites=true' , { useNewUrlParser: true });
    mongoose.connection.once('open',()=>{
        //winston.info('Connection made');
        console.log(config.db);
    }).on('error', (error)=>{
        console.log('Connection error', error);
    });
} 

//mongodb://localhost/vidly