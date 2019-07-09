const {Customer, validateCustomer} = require('../models/customer');
const express = require('express');
const router = express.Router();

//Getting all customers
router.get('/',async (req,res)=>{
    const customers = await Customer.find().sort();
    res.send(customers);
});

//Getting one particular customer
router.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404).send('Customer not found');
        return;
    }
    res.send(customer);
});

//Adding/Posting new customer
router.post('/', async (req,res)=>{
    const{ error } = validateCustomer(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold:req.body.isGold
    })

    customer = await customer.save();
    res.send(customer);
});

//Putting customer
router.put('/:id',async (req,res)=>{
    const{ error } = validateCustomer(req.body);
    if(error) return res.status(404).send(error.details[0].message);
        
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name : req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        {new: true})

    if(!customer){
        res.status(404).send('customer not found');
        return;
    }
    
    res.send(customer);

});

//Deleting particular customer
router.delete('/:id', async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer){
        res.status(404).send('customer not found');
        return;
    }
    res.send(customer);
});

module.exports = router;