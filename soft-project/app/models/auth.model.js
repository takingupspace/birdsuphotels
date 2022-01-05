const sql = require("./db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getMaxListeners } = require("./db.js");
const tokenSecret = "my-token-secret"
const rounds = 10
require('dotenv').config()

// to be used to store the refreshToken
let users = {

}

const Auth = function(auth){
    this.userName = auth.userName;
    this.password = auth.password;
    this.email = auth.email;
};


Auth.verifySession = (req, result) => {
    let checkAccessToken = req.body.email;
    console.log("checkAccessToken in Auth Model = " + checkAccessToken);

    // if(!checkAccessToken){
    //     return result("There is no active session for this user!")
    // }

    sql.query(`SELECT session from customers c WHERE c.email = '${checkAccessToken}'`, (err, res) => {
        // if(err){
        //     console.log("That user doens't exit, or they have no active session")
        // }
        if(res[0] == null){
            // console.log("There is no user here")
            return result("There is no session for this user or the user does not exist", null)
        }
        if(res[0] != null){
            // console.log("session is = " + (res[0].session))
            return result(null, res[0].session)
        }
        //payload = jwt.verify(res[0].session, process.env.ACCESS_TOKEN_SECRET)
        //console.log("payload = " + payload)
    })
    // let payload
    // try{
    //     payload = jwt.verify(checkAccessToken, process.env.ACCESS_TOKEN_SECRET)
    // }catch(e){
    //     return result("error in verifying token")
    // }
}

Auth.createUser = (userName, password, firstName, lastName, result) => {
    bcrypt.hash(password, rounds, (error, hash) => {
        //console.log("pass is " + password);
        if (error) result(null, error)
        else {
            //const newUser =  Auth({email: userName, password: hash});
            // console.log("new user is " + JSON.stringify(newUser));
            sql.query(`INSERT INTO customers (firstName, lastName, password, email) VALUES ('${firstName}', '${lastName}', '${hash}', '${userName}')`, (err, res) => {
                if(err){
                    console.log("This user already exists!");
                    result("This user already exists!", null);
                    return;
                }
                console.log("User entered into the customers table")
                result(null, res);
        });
    }
});

};

Auth.userLogin = (userName, password, result, cookie) => {
    sql.query(`SELECT email, password from customers c WHERE c.email = '${userName}'`, (err, res) => {
        if(err){
            console.log("error" + err);
            result(null, err);
            return
        }

        if(res[0] == null){
            return result("There is no user in the database with these credentials", null)
        }

        cookie = "asdfdsfdfdfdfa"
        bcrypt.hash(password, rounds, (error, hash) => {
            if (error) result(null, error)

        // bcrypt.compare(res[0].password, password, (error, match) => {
        //     console.log(res[0].password)
        //     console.log(match)
        //     console.log(password)
        //     if(error) result(null, error)
        //     else if (match) result( { token : generateToken(userName) })
        //     else result(null, { error : 'passwords do not match' })
        // })
        //console.log("res of SQL is " + res[0])
        const match = bcrypt.compareSync(password, res[0].password)
        if(match){
            //console.log("password is: " + password)
            //console.log("hash is : " + hash)
            //console.log("res[0].password is: " + res[0].password)
            console.log("Passwords match, issuing a token")
            // function generateToken (user) {
            //     return jwt.sign({ data : user }, tokenSecret, {expiresIn : '24h'})
            // }
            let payload = {userName : userName}
            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            })
            console.log("access token is = " + accessToken)
            sql.query(`UPDATE customers c SET session = '${accessToken}' WHERE c.email ='${userName}'`, (err, res) => {
                if(err){
                    console.log("error: couldn't add cookie to DB", err)
                }else{
                    console.log("cookie successfully added to DB")
                }
            })
            //users[userName].refreshToken = refreshToken;
            //console.log("cookie is " + JSON.stringify(cookie))
            result(null, accessToken)
            // result(null, generateToken(res[0].userName))
        }else{
            console.log('passwords did not match')
            result("passwords do not match", null)
        }
        
    })
})
}

module.exports = Auth;