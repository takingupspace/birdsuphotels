const sql = require("./db.js");

const Room = function(rooms) {
    this.roomNumber = rooms.roomNumber;
    this.totalCost = rooms.totalCost;
    this.roomType = rooms.roomType;
    this.isBooked = rooms.isBooked;
    //this.roomOwner = rooms.roomOwner;
  };

  Room.getAll = result => {
    sql.query("SELECT * FROM properties", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("properties: ", res);
      result(null, res);
    });
  };

  Room.updateBookingQuery = (req, result) => {
    sql.query(`UPDATE rooms r inner join properties p on r.propId = p.propId SET r.isBooked = ${req.body.isBooked} WHERE r.propId = '${req.body.propertyID}' AND r.roomId = '${req.body.roomID}'`,
    
    (err, res) =>{
      console.log('res in updateBooking model is = ' + (JSON.stringify(res)));
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }else if(res.message[27] == 0 && req.body.isBooked == 1){
        return result("A reservation for this client already exists!", null);
      }else if(res.message[27] == 0 && req.body.isBooked == 0){
        return result("There is no reservation for this client or their reservation has already been removed!", null);
      }else{
        // here res.message[27] == whether or not there were any changes to the booking
        // the way we want to use this so we don't duplicate rentals is
        // use res.message[27] to check if a change was made AND isBooked = 1
        // then we pass control to the next method or we return
        console.log('res in updateBooking model is = ' + (res.message[27]));
        //console.log("updated property booking");
      result(null, res);
      }
    });
  };

  Room.makeBook = (roomId, result) => {
    console.log("roomId = ", roomId)
    sql.query(`UPDATE rooms set rooms.isBooked = '1' where rooms.roomId = '${roomId}'`, (err/*, res*/) => {
      if (err) {
        console.log("error with updating", err);
        result(null, err);
        return;
      }
  
      console.log("success updating"/*, res*/);
      result(null/*, res*/);
    });
  };

  module.exports = Room;