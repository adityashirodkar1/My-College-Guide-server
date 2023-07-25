const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB - Applicant')
    })
    .catch(err => {
        console.log('Error: '+err)
    })

const teamSchema = new mongoose.Schema({
    chairperson: {
        type: [mongoose.Schema.Types.Mixed]
    },
    viceChairperson: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    secretary: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    headOfFinance: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    headOfMarketing: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    publicRelationHead: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    technicalHead: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    operationhead: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    creativeHead: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    headOfSubcom: {
        type: [mongoose.Schema.Types.Mixed]
    } ,
    subcom: {
        type: [mongoose.Schema.Types.Mixed]
    }
})

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;