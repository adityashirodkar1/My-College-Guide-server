const express = require('express');
const adminAuthenticate = require('../middleware/admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Event = require('../models/event');
const Committee = require('../models/committee');

router.get('/', adminAuthenticate, (req,res) => {
    res.send('Hey')
})

router.get('/fetchEvents', adminAuthenticate, async (req,res) => {
    try {
        const committee = await Committee.findById(req.committee.id);
        let events = []
        for (let eventId of committee.events){
            let event = await Event.findById(eventId)
            events.push(event)
        }
        res.send(events)
    } catch (error) {
        return res.status(500).send({ errors: "Some error occured" })
    }
})

//ROUTE 3: To ADD an Event
router.post('/addEvent', adminAuthenticate, [
    body("title", "Title can't be blank").exists(),
    body("description", "Description can't be blank").exists(),
    body("type", "Type can't be blank").exists(),
    body("date", "Date can't be blank").exists()
], async (req,res) => {
    const errors = validationResult(req);
    //If there are errors, return BAD Request and the errors
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    try {
        const committee = await Committee.findById(req.committee.id);
        const event = new Event(req.body);
        committee.events.push(event);
        await event.save();
        await committee.save();
        res.send(req.body)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({ errors: "Some error occured" })
    }
})

//ROUTE 4: To UPDATE an existing Event
// router.put('/editEvent/:id', adminAuthenticate, async (req,res) => {

// })


module.exports = router;