const sql = require('./db.js');

const ImageFile = function(property){
    this.imgURL = property.imgURL;
};

ImageFile.uploadImage = (req, result) => {
    sql.query(``, (err, res) =>{
        if(err){
            console.log('err in uploadImage model = ' + err);
            return result(err, null);
        }else{
            console.log('the image was successfully added to the database');
            return result(null, res);
        }
    })
}

module.exports = ImageFile;