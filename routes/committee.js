const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Committee = require('../models/committee');
const Event = require('../models/event');
const JWT_SECRET = 'oculusisworsethanmydick$hahaxd';
const mongoose = require('mongoose');
const Team = require('../models/team');

router.get('/', async (req,res) => {
    const committee = await Committee.find({}).select(['name', 'events'])
    res.send(committee)
})

router.get('/:id', async (req,res) => {
    try {
        const eveId = req.params.id
        let committee = {}
        let events = []
        let eventobj = {}
        const committees = await Committee.find({});
        for (let com of committees){
            if (com.events.indexOf(eveId) !== -1){ 
                committee = com
            }
        }
        for (let eveId of committee.events){
            let event = await Event.findById(eveId)
            eventobj.name = event.title
            eventobj.eventId = eveId
            events.push(eventobj)
            eventobj = {}
        }

        let com = JSON.parse(JSON.stringify(committee));
        com.eve = events
        res.send(com)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ errors: "Server Error" })
    }
})

//get committee with id
router.get('/with/:id', async (req,res) => {
    try {
        const comId = req.params.id
        const committee = await Committee.findById(comId)
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
        let success = false;
        let committee = await Committee.findOne({username})
        if(!committee){
            return res.status(400).json({ success, error: "Invalid Username or Password"})
        }
        console.log(password)
        const passwordCompare = await bcrypt.compare(password, committee.password)
        console.log(passwordCompare)
        if(!passwordCompare){
            return res.status(400).json({ success, error: "Invalid Username or Password"})
        }

        const data = {
            committee: {
                id: committee.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        success = true
        res.json({success,authtoken})

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

        //Updating Request Body
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

//Get team
router.get('/team/:id', async (req,res) => {
    try {
        const team = await Team.findOne({committeeId: req.params.id})
        res.json(team)
    } catch (error) {
        return res.status(500).send({ errors: "Internal Server Error" })
    }
})

router.get('/posters', async (req,res) => {
    res.send("de")
})


module.exports = router;