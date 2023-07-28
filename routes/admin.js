const express = require('express');
const adminAuthenticate = require('../middleware/admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Event = require('../models/event');
const Committee = require('../models/committee');
const Team = require('../models/team');
const Poster = require('../models/poster');


router.get('/', adminAuthenticate, (req,res) => {
    res.send('Hey')
})

//ROUTE 1: Get Committee
router.get('/committee/:id', adminAuthenticate, async (req,res) => {
    try {
        const { id } = req.params
        if (id !== req.committee.id){
            return res.status(401).send({ errors: "Invalid Login" })
        }
        let events = []
        let eventobj = {}
        const committee = await Committee.findById(id);
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
        return res.status(500).send({ errors: "Internal Server Occurred" })
    }
})

//ROUTE 2: Fetch Event of committee
router.get('/events/:id', adminAuthenticate, async (req,res) => {
    try {
        const { id } = req.params
        // if (id !== req.committee.id){
        //     return res.status(401).send({ errors: "Invalid Login" })
        // }
        const event = await Event.findById(id);

        res.send(event)
    } catch (error) {
        return res.status(500).send({ errors: "Internal Server Occurred" })
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
        req.body.committee = committee.name
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

// //ROUTE 4: To UPDATE an existing Event
// router.put('/editEvent/:id', adminAuthenticate, async (req,res) => {

// })

//ROUTE 5: To EDIT an existing Committee
router.put('/committee/:id', adminAuthenticate, async (req,res) => {
    try {
        
        const { id } = req.params
        if (id !== req.committee.id){
            return res.status(401).send({ errors: "Invalid Login" })
        }
        const committee = await Committee.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.send(committee)

    } catch (error) {
        return res.status(500).send({ errors: "Interval Server Error" })
    }
})

//ROUTE 6: Craete a Team
router.post('/team/:id', adminAuthenticate, async (req,res) => {
    try {
        
        const committee = await Committee.findById(req.params.id)
        let str = ""
        let obj = req.body
        console.log(obj)
        for (let key in obj){
            str = req.body[key]
            let arr = str.split('-')
            console.log(key)
            req.body[key] = arr
        }
        const team = new Team(req.body);
        team.save();
        committee.team = team
        committee.save();
        res.send(team)
        
    } catch (error) {
        return res.status(500).send({ errors: "Interval Server Error" })
    }
})

router.post('/addposter', async (req,res) => {
    const poster = new Poster(req.body)
    poster.save();
    res.send(poster)
})


module.exports = router;