const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Applicant = require('../models/applicant');
const Event = require('../models/event');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({})
        res.send({ status: "ok", data: events })
    } catch (error) {
        console.log(`Error in backend: ${error}`)
    }  
})

router.post('/register', [
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

        // applicant = new Applicant(req.body)
        // applicant.save()

        res.json(req.body)
    } catch (error) {
        console.log("error.msg")
        return res.status(500).send({ errors: "Some error occured" })
    }
})

module.exports = router;