
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const cors = require('cors')

router.use(cors({
    origin:'*'
}));

router.post('/createinvestor', async (req, res) => {
    
    const investor = new User({
        _id: req.body._id,
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        companyname: req.body.companyname,
        avatar : req.body.avatar,
        profile : req.body.profile
    });
    
    try {
        
        await investor.save()
        res.status(201).send(investor)

    } catch (e) {
        
        res.status(400).send(e);
    }
    
})

router.get('/investor/:id', async (req, res) => {
    
    const ID = req.params.id
    
    try{
        const investor = await User.findOne({ _id: ID })
        
        if(!investor){
            return res.status(404).send({msg : "Investor Not Found"})
        }
        
        res.send(investor)

    }catch(e){
        res.status(500).send()
    }
})


module.exports = router