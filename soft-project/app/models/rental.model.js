const sql = require("./db.js");

// we don't actually ever use the constructor, we've been purely passing JSON
// data for adding to or deleting from tables
const Rental = function(rentals) {
    this.roomNumber = rentals.roomNumber;
    this.roomProperty = rentals.roomProperty;
    this.startDT = rentals.startDT;
    this.endDT = rentals.endDT;
    this.clientName = rentals.clientName;
    //this.roomOwner = rentals.roomOwner;
  };
  Rental.updateBookingQuery = (req, result) => {
    sql.query(`INSERT INTO rental (roomNumber, roomProperty, startDT, endDT, clientFirstName, clientLastName) VALUES ('${req.body.roomID}', '${req.body.propertyID}', '${req.body.startDT}', '${req.body.endDT}', '${req.body.firstName}', '${req.body.lastName}')`,
    (err, res) =>{
      if(err){
        console.log("error: ", err);
        //result(null, err);
        return;
      }
      if(res.affectedRows == 0){
        console.log('sql error in update rental model is = ' + err)
        //result('duplicate entry for this client', null);
        return;
      }
      console.log("updated property booking");
      //result(null, res);
    });
  };

  // not sure if this is correct, had to change roomNumber parameter, to be the propId, otherwise we were gettting foreign key error from SQL
  Rental.create = (roomNumber, roomOwner, roomProperty, startDT, endDT, clientFirstName, clientLastName, result) => {
    sql.query(`insert into rental (roomNumber, roomOwner, roomProperty, startDT, endDT, clientFirstName, clientLastName) values
    ('${roomNumber}', '${roomOwner}', '${roomProperty}', '${startDT}', '${endDT}', '${clientFirstName}', '${clientLastName}')`, (err, res) => {
      if(err){
        console.log("error: ", err);
        return;
      }
      result(null, res);
    });
  };
  module.exports = Rental;