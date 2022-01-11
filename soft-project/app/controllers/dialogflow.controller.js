const Dialog = require('../models/dialogflow.model.js');

exports.chatBot = (req, res) => {
    Dialog.chatBotFlow(req, (err, data) => {
        if(err){
            console.log('err in dialogflow controller is = ' + err)
        }else{
            res.send(data);
        }
    })
}