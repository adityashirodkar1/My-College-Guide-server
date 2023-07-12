const Committee = require('../models/committee');
const mongoose = require('mongoose');
const url = 'mongodb+srv://adishiro:gintoki@cluster0.wlmssnp.mongodb.net/HahaXD?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Error: '+err)
    })


comObj = [
    {
        name: "Oculus",
        description: `Jujutsu Kaisen (呪術廻戦, "Sorcery Fight") is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 23 tankōbon volumes as of July 2023. The story follows high school student Yuji Itadori as he joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host. Jujutsu Kaisen is a sequel to Akutami's Tokyo Metropolitan Curse Technical School, serialized in Shueisha's Jump GIGA from April to July 2017, later collected in a tankōbon volume, retroactively titled as Jujutsu Kaisen 0, in December 2018.`,
        history: `Yuji Itadori is an unnaturally fit high school student living in Sendai. On his deathbed, his grandfather instils two powerful messages within Yuji: "always help others" and "die surrounded by people." Yuji's friends at the Occult Club attract Curses to their school when they unseal a rotten finger talisman. Yuji swallows the finger to protect Jujutsu Sorcerer Megumi Fushiguro, becoming host to a powerful Curse named Ryomen Sukuna. Due to Sukuna's evil nature, all sorcerers are required to exorcise him (and, by extension, Yuji) immediately. However upon seeing Yuji retaining control over his body, Megumi's teacher Satoru Gojo brings him to the Tokyo Prefectural Jujutsu High School with a proposal to his superiors: postpone Yuji's death sentence and train under Gojo until he consumes all 20 of Sukuna's fingers so the Curse can be eliminated. At the same time, a group of Cursed Spirits plot a multi-layered attack on the world of Jujutsu sorcery, including the Cursed Spirit Mahito and a corrupted sorcerer named Suguru Geto, who was executed by Gojo a year prior.`,
        username: "",
        team: ['Hiroaki Matsutani','Makoto Kimura','Toshihiro Maeda','Yoshiaki Takagaki','Yuriha Murai'],
        sponsors: ['MAPPA', 'Crunchyroll','SEA','JNN'] 
    },
    {
        name: "IEEE",
        description: `Jujutsu Kaisen (呪術廻戦, "Sorcery Fight") is a Japanese manga series written and illustrated by Gege Akutami. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since March 2018, with its chapters collected and published in 23 tankōbon volumes as of July 2023. The story follows high school student Yuji Itadori as he joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host. Jujutsu Kaisen is a sequel to Akutami's Tokyo Metropolitan Curse Technical School, serialized in Shueisha's Jump GIGA from April to July 2017, later collected in a tankōbon volume, retroactively titled as Jujutsu Kaisen 0, in December 2018.`,
        history: `Yuji Itadori is an unnaturally fit high school student living in Sendai. On his deathbed, his grandfather instils two powerful messages within Yuji: "always help others" and "die surrounded by people." Yuji's friends at the Occult Club attract Curses to their school when they unseal a rotten finger talisman. Yuji swallows the finger to protect Jujutsu Sorcerer Megumi Fushiguro, becoming host to a powerful Curse named Ryomen Sukuna. Due to Sukuna's evil nature, all sorcerers are required to exorcise him (and, by extension, Yuji) immediately. However upon seeing Yuji retaining control over his body, Megumi's teacher Satoru Gojo brings him to the Tokyo Prefectural Jujutsu High School with a proposal to his superiors: postpone Yuji's death sentence and train under Gojo until he consumes all 20 of Sukuna's fingers so the Curse can be eliminated. At the same time, a group of Cursed Spirits plot a multi-layered attack on the world of Jujutsu sorcery, including the Cursed Spirit Mahito and a corrupted sorcerer named Suguru Geto, who was executed by Gojo a year prior.`,
        username: "",
        team: ['Hiroaki Matsutani','Makoto Kimura','Toshihiro Maeda','Yoshiaki Takagaki','Yuriha Murai'],
        sponsors: ['MAPPA', 'Crunchyroll','SEA','JNN'] 
    }
]