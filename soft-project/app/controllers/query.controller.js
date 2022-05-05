const Query = require('../models/query.model.js');

exports.getData = (req, res) => {
    console.log('secondTable in controller is ' + req.body.secondTable);
    Query.getData(req, (err, data) => {
        if(err){
            res.send({
                data : "Some Error on Server Side"
            });
        }else{
            res.send({
                data : data
            })
        }
    })
}