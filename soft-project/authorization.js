const jwt = require('json-web-token')

exports.verify = function(req, res, next){

    let accessToken = req.cookies.jwt
    let userName = req.cookies
    console.log("req is " + JSON.stringify(req.cookies))
    if(!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        // now we verify the token
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    }catch(e){
        // 401 means that the client does not have authorization for this resource
        return res.status(401).send()
    }
}