const auth = require('../middleware/auth');
const bcrypt =  require('bcrypt');
const _ = require('lodash');
const {User, validateUser} = require('../models/user');
const express = require('express');
const router = express.Router();

//Sending all genres
// router.get('/',async (req,res)=>{
//     const users = await User.find().sort();
//     res.send(users);
// });

router.get('/me', auth, async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req,res)=>{
    const{ error } = validateUser(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

let user = await User.findOne({ email: req.body.email});
if(user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body,['name', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user, ['name','email']));
});


module.exports = router;