const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB - Event')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

const posterSchema = new mongoose.Schema({
    img: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    committee: {
        type: String,
    }
})

const Poster = mongoose.model('Poster', posterSchema);
module.exports = Poster;