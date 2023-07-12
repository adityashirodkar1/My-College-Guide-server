const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const Applicant = require('./models/applicant');
const mongoose = require('mongoose');
const url = `mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

app.use(cors())
app.use(express.json())

//Routes
app.use('/api/events', require('./routes/event'))
app.use('/api/committees', require('./routes/committee'))

app.listen(5000, () => {
    console.log(`Listening at http://localhost:5000`)
})