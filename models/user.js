const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    isAdmin: Boolean
  });

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_is: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

//   const User =  mongoose.model('User', userSchema);

  function validateUser(user) {

    const schema = {
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
        };
    
        return Joi.validate(user, schema);
  }
  

exports.User = User;
exports.validateUser = validateUser;