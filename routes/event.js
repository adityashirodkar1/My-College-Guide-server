const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Applicant = require('../models/applicant');
const Event = require('../models/event');
const Committee = require('../models/committee');
const Poster = require('../models/poster');

//ROUTE 1: TO GET ALL EVENTS
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({})
        res.send(events)
    } catch (error) {
        console.log(`Error in backend: ${error}`)
    }  
})

//ROUTE 2: TO GET EVENT BY NAME
router.get('/name/:title', async (req, res) => {
    try {
        // let events = []
        const events = await Event.find({title: req.params.title})
        // events.push(event)
        res.send(events)
    } catch (error) {
        console.log(`Error in backend: ${error}`)
    }  
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const committee = await Committee.findById(id);
        const eventIds = committee.events
        let events = []
        for (let eveId of eventIds){
            let event = await Event.findById(eveId);
            events.push(event)
        }
        res.send(events)
    } catch (error) {
        console.log(`Error in backend: ${error}`)
    }  
})

//ROUTE 3: TO REGISTER APPLICANT
router.post('/register/:id', [
    body('email', 'Enter a valid name').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    //If there are errors, return BAD Request and the errors
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    try {
        // Check whether an applicant with this email already exists or not
        let applicant = await Applicant.findOne({ email: req.body.email })
        if (applicant) {
            return res.status(400).json({ errors: "Sorry a applicant with this email already exists" })
        }

        // applicant = await Applicant.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     event: req.body.event,
        // })
        req.body.eventId = req.params.id
        applicant = new Applicant(req.body)
        applicant.save()

        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ errors: "Some error occured" })
    }
})

module.exports = router;