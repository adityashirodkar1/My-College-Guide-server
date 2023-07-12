const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB - Event')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    committeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Committee'
    }
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;