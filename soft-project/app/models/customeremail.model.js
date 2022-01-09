const sql = require('./db.js');
const nodemailer = require('nodemailer');
const creds = require('../models/custcreds.js');
require('dotenv').config();

const CustomerEmail = function(email){
    this.name = email.name;
    this.email = email.email;
    this.message = email.message
}

CustomerEmail.sendCustEmail = (req, result) => {
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            type : 'OAuth2',
            user : creds.EMAIL,
            pass : creds.PASS,
            clientId : process.env.OAUTH_CLIENTID,
            clientSecret : process.env.OAUTH_CLIENT_SECRET,
            refreshToken : process.env.OAUTH_REFRESH_TOKEN,
        }
    });

    let mailOptions = {
        from : creds.EMAIL + '@gmail.com',
        to : creds.CUSTEMAIL + '@gmail.com',
        subject : 'customer email test',
        text : 'this is a test email to send confirmation numbers from the birdsuphotels admin account to a user who makes a reservation'
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if(err){
            console.log("Error in sending client reservation emails = " + err);
        }else{
            console.log("Email sent in client reservations email and the data is = " + JSON.stringify(data));
        }
    })
}

module.exports = CustomerEmail;