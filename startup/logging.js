const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

const config = require('config');

const dbLink= config.get("db");

module.exports = function() {
    process.on("uncaughtException", ex => {
      winston.error(ex.message, ex);
      process.exit(1);
    });
   
    process.on("unhandledRejection", ex => {
      winston.error(ex.message, ex);
      process.exit(1);
    });
   
    winston.add(new winston.transports.File({ filename: "logfile.log" }));
   
    winston.add(
      new winston.transports.MongoDB({
        db: dbLink,
        level: "info"
      })
    );
   
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    );
  };


// module.exports = function(){
//     process.on('uncaughtException', (ex)=>{
//         winston.error(ex.message,ex);
//         process.exit(1);
//     });
    
//     process.on('unhandledRejection', (ex)=>{
//         winston.error(ex.message,ex);
//         process.exit(1);
//     });
    
//     winston.configure({transports: [new winston.transports.File({ filename: 'logfile.log' }) ]});
//     winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly'}));
    
// }