const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

const dbLink= config.get("db");

console.log('-----------++++++++DB Link', dbLink);


module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly' , { useNewUrlParser: true });
    mongoose.connection.once('open',()=>{
        //winston.info('Connection made');
        console.log(config.db);
    }).on('error', (error)=>{
        console.log('Connection error', error);
    });
} 

//