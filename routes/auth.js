const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt =  require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

//Sending all genres
// router.get('/',async (req,res)=>{
//     const users = await User.find().sort();
//     res.send(users);
// });

router.post('/', async (req,res)=>{
    const{ error } = validate(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email});
    if(!user) {return res.status(400).send('Invalid email or password');}

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

   const token = user.generateAuthToken();

    res.send(token);
});


function validate(req) {

    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
        };
    
        return Joi.validate(req, schema);
  }

module.exports = router;