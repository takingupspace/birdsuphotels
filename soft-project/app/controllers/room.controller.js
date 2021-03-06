const Room = require("../models/room.model.js");
const Rental = require("../models/rental.model.js");

exports.addRoom = (req, res) => {
  Room.addRoom(req, (err, data) => {
    if(err){
      res.send({
        err : err,
        message: 'There was an error when trying to add this room to the database!'
      })
      console.log('err within add room controller is ' + err)
    }else{
      console.log('successfully added room to database');
      res.send({
        data : data,
        message : 'Room was successfully added to the database!'
      })
    }
  })
}

exports.makeBooking = (req, res) => {
  Room.makeBook(req.body.roomId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating."
      });
    else res.send(/*data*/);
  });
};

exports.removeBooking = (req, res) => {
  Room.deleteBooking(req, (err, data) => {
    if(err){
      console.log('err inside removeBooking controller = ' + err)
    }else{
      res.send('successfully deleted the booking');
    }
  })
}

exports.findAll = (req, res) => {
    Property.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving properties."
        });
      else res.send(data);
    });
  };
exports.updateBooking = (req, res, next) => {
  //console.log("inside updateBooking")
  //console.log("req in updateBooking controller is " + JSON.stringify(req.body))
  
    Room.updateBookingQuery(req, (err, data) => {
        if(err){
          res.send({
            message: err
          })
          return;
        }else{
          if(req.body.isBooked == 1){
            sendData = "Successfully added the booking for this client!"
          }else{
            sendData = "Successfully removed the booking for this client!"
          }
          res.send({
            message: sendData
          })
          next()
      }
    }
    );
}

// don't confuse update booking query model methods between updatebooking and updatebookingrental
// THEY USE DIFFERENT MODEL MODULES
exports.updateBookingRental = (req, res) => {
  //console.log('req.body inside updateBookingRENTAL within the controller is ' , JSON.stringify(req.body))
  if(req.body.isBooked == 0){
    return;
  }
  console.log('return when isBooked = 0 in updateBookingrental controller failed');
  Rental.updateBookingQuery(req, (err, data) => {
        if(err){
          res.send({
            message: "Couldn't update this property's booking"
          })
          return;
        }else{
          if(req.body.isBooked == 1){
            sendData = "Successfully added the booking for this client!"
          }else{
            sendData = "Successfully removed the booking for this client!"
          }
          res.send({
            message: sendData
          })
        }
      }
  );
};