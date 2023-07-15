const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Committee = require('../models/committee');
const JWT_SECRET = 'oculusisworsethanmydick$hahaxd';
const mongoose = require('mongoose')

router.get('/', (req,res) => {
    res.send('Hey')
})

router.get('/:id', async (req,res) => {
    try {
        const comId = req.params.id
        let committee = {}
        const committees = await Committee.find({});
        for (let com of committees){
            if (com.events.indexOf(comId) !== -1){
                committee = com
            }
        }
        res.send(committee)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ errors: "Server Error" })
    }
})

// Authentication of committee (admin)
router.post('/adminlogin', [
    body("username", "Username can't be blank").exists(),
    body("password", "Password can't be blank").exists()
] , async (req,res) => {
    const errors = validationResult(req);
    //If there are errors, return BAD Request and the errors
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    
    const { username , password } = req.body
    
    try {
        let committee = await Committee.findOne({username})
        if(!committee){
            return res.status(400).json({error: "Invalid Username or Password"})
        }
        
        console.log(committee.username)
        const passwordCompare = bcrypt.compare(password, committee.password)
        if(!passwordCompare){
            return res.status(400).json({error: "Invalid Username or Password"})
        }

        const data = {
            committee: {
                id: committee.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        res.json({authtoken})

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ errors: "Some error occured" })
    }
})

router.post('/add', async (req,res) => {
    const errors = validationResult(req);
    //If there are errors, return BAD Request and the errors
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    
    try {
        // Check whether an committee with this name already exists or not
        let committee = await Committee.findOne({ name: req.body.name })
        if (committee) {
            return res.status(400).json({ errors: "Sorry a committee with this name already exists" })
        }

        //Hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        req.body.password = secPass

        //String to Array
        teamStr = req.body.team
        sponsorStr = req.body.sponsors
        team = teamStr.split('-')
        sponsors = sponsorStr.split('-')

        //Updating Request Body
        req.body.team = team
        req.body.sponsors = sponsors

        committee = new Committee(req.body)
        committee.save()

        //Generating token
        const data = {
            committee: {
                id: committee.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        res.json({authtoken})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ errors: "Some error occured" })
    }
})

module.exports = router;