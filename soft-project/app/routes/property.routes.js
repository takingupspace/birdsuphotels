module.exports = app => {
    const properties = require("../controllers/property.controller.js");
    const auth = require('../controllers/auth.controller.js');

    app.get("/properties", properties.findAll);

    // this should be a 'GET'
    app.post("/propertyCity", properties.findCity);
    
    app.put("/propertyUpdateAvailability", properties.updateAvailability);

    app.post("/isBooked", auth.verify, properties.findAvailableProperties); // if URI is equal to isBooked, we route the request to findAvailableProperties controller

    app.post("/clientBookings", properties.getClientBookings);

  };