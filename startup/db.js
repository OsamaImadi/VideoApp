const mongoose = require('mongoose');
const winston = require('winston');


module.exports = function(){
    mongoose.connect('mongodb://127.0.0.1/Cluster0' , { useNewUrlParser: true });
    mongoose.connection.once('open',()=>{
        winston.info('Connection made');
    }).on('error', (error)=>{
        console.log('Connection error', error);
    });
} 