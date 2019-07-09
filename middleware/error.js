// const winston = require('winston');

// module.exports= function(err,req,res,next){
//     winston.error(err.message, err);
//     res.status(500).send('Something failed');
// }

// const { createLogger, transports } = require('winston');
 
// const logger = createLogger({
//   transports: [
//     new transports.File({ filename: './vidly_info.log', level: 'info' }),
//     new transports.Console()
//   ]
// });
 
// module.exports = (err, req, res, next) => {
//   logger.error(err.message);
//   res.status(500).send('Somethings went wrong!');
// };

const winston = require('winston'); // <-- removed this from index.js (I kept 'error' requirement in index.js)
require('winston-mongodb');

const config = require('config');

const dbLink= config.get("db");
 
const logger = winston.createLogger({
  transports: [ // <-- removed the transports from index.js, put them here.
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ db:dbLink, metaKey: "meta" }) // <-- { metaKey: "meta" } just makes sure the field is saved under the name 'meta' in the database, probably not necessary.
  ]
});
 
module.exports = function(err, req, res, next) {
    logger.error(err.message, {
        meta: {
            message: err.message,
            name: err.name,
            stack: err.stack
        }
    });
 
    res.status(500).send('Something failed.');
}