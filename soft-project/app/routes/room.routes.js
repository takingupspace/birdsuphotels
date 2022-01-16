module.exports = app => {
    const rooms = require("../controllers/room.controller.js");
    const {verify} = require('../../authorization.js');
    const auth = require('../controllers/auth.controller.js')

    app.post("/updateBooking", auth.verify, rooms.updateBooking, rooms.updateBookingRental);

    app.post("/setBooking", rooms.makeBooking);

    app.get("/rooms", rooms.findAll);

    app.post('/removeBooking', rooms.removeBooking)

    app.post('/addRoom', rooms.addRoom)
}