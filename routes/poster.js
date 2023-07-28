const express = require('express');
const Poster = require('../models/poster');
const router = express.Router();

router.get('/', async (req,res) => {
    const posters = await Poster.find({})
    res.send(posters)
})

module.exports = router;