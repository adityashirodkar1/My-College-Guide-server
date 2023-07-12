const Event = require('../models/event');
const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

eveObj = [
    {
        title: 'Foodgasm',
        type: 'Social',
        date: new Date('2023-07-21')
    },
    {
        title: 'Hackathon',
        type: 'Techincal',
        date: new Date('2023-08-12')
    },
    {
        title: 'Concert',
        type: 'Cultural',
        date: new Date('2023-08-22')
    },
    {
        title: 'Dance Dilse',
        type: 'Cultural',
        date: new Date('2023-07-17')
    }
]

try {
    Event.insertMany(eveObj);
} catch (error) {
    console.log('Error'+error)
}