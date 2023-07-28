const jwt = require('jsonwebtoken');
const JWT_SECRET = 'oculusisworsethanmydick$hahaxd';

const adminAuthenticate = (req,res,next) => {
    let token = req.header('auth-token')
    if(!token){
        return res.status(401).send({ what: token, errors: "PLease authenticate using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.committee = data.committee;
        next(); 
    } catch (error) {
        return res.status(401).send({ what:"hahahahaa", errors: "PLease authenticate using valid token" })
    }
}

module.exports = adminAuthenticate;