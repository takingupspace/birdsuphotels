module.exports = app => {
    const rentals = require("../controllers/rental.controller.js");
    const {verify} = require('../../authorization.js');
    const auth = require('../controllers/auth.controller.js')

    app.post("/createRental", auth.verify, rentals.createRental);

    // nothing implemented here yet, because we've only needed to use the rental model and controller
    // the rental.model and rental.controller are used with next() callback function within the room controller
    // so that we can utilize multiple callback functions, eventually implementing authentication as a part of those functions
}