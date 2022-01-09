const CustomerEmail = require('../models/customeremail.model.js');

exports.sendCustomerEmail = (req, res) => {
    CustomerEmail.sendCustEmail(req, (err, data) => {
        if(err){
            console.log('err inside customer email controller = ' + err)
        }else{
            res.send(data);
        }
    })
}