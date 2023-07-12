const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB - Applicant')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
})

const Applicant = mongoose.model('Applicant', applicantSchema);
module.exports = Applicant;