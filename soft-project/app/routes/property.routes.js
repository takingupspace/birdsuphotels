module.exports = app => {
    const properties = require("../controllers/property.controller.js");

    app.get("/properties", properties.findAll);

    // this should be a 'GET'
    app.post("/propertyCity", properties.findCity);
    
    app.put("/propertyUpdateAvailability", properties.updateAvailability);

    app.get("/isBooked", properties.findAvailableProperties); // if URI is equal to isBooked, we route the request to findAvailableProperties controller

  };