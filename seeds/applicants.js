const Applicant = require('../models/applicant');
const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

appObj = [
    {
        name: 'Aditya Shirodkar',
        dob: new Date("2003-09-19"),
        event: 'Hackathon',
        email: 'aditya.shirodkar@spit.ac.in'
    },
    {
        name: 'Sakata Gintoki',
        dob: new Date("2000-10-21"),
        event: 'Foodgasm',
        email: 'sakata.gintoki@spit.ac.in'
    }
]

try {
    Applicant.insertMany(appObj);
} catch (error) {
    console.log('Error'+error)
}