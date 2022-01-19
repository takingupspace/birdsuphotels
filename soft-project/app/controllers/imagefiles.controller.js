const ImageFile = require('../models/imagefiles.model.js');

exports.uploadImage = (req, res) => {

    ImageFile.uploadImage(req, (err, data) => {

    if(err){
        console.log('error in upload image is = ' + err);
    }else{
        res.status(200).send({
            message : "Your image was successfully added to the database!",
            data : data
        });
    }
    })
}