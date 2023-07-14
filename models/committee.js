const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB - Committee')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

const committeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    history: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    team: {
        type: [String]
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    sponsors: {
        type: [String]
    }
})

const Committee = mongoose.model('Committee', committeeSchema);
module.exports = Committee;