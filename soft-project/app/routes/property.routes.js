module.exports = app => {
    const properties = require("../controllers/property.controller.js");
    const auth = require('../controllers/auth.controller.js');
    const multer = require('multer');

    const storage = multer.diskStorage({
      destination : function(req, file, cb){
        cb(null, 'images');
      },
      filename : function ( req, file, cb){
        cb(null, file.originalname);
      }
    });

    var upload = multer({storage : storage})

    app.get("/properties", properties.findAll);

    // this should be a 'GET'
    app.post("/propertyCity", properties.findCity);
    
    app.put("/propertyUpdateAvailability", properties.updateAvailability);

    app.post("/isBooked", auth.verify, properties.findAvailableProperties); // if URI is equal to isBooked, we route the request to findAvailableProperties controller

    app.post("/clientBookings", properties.getClientBookings);

    app.post('/addProperty', auth.verify, properties.addProperty,  upload.single('image'), (req, res) => {
      res.send()
      }, (error, req, res, next) => {
        res.status(400).send({
          error : error.message
        })
      });

    app.post('/uploadImage', upload.single('image'), (req, res) => {
      res.send()
      }, (error, req, res, next) => {
        res.status(400).send({
          error : error.message
        })
      })

  };