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
      sql.query(`delete rental
      from rental
      inner join (
      select max(rentalId) as lastId, roomNumber, roomProperty
      from rental
      group by roomNumber, roomProperty
      having count(*) > 1) duplic on duplic.roomNumber = rental.roomNumber
      AND duplic.roomProperty = rental.roomProperty
      WHERE rental.rentalId < duplic.lastId;`, (err, res) => {
        if(err){
          console.log("error in create rental delete duplicate rentals model = " + err);
          return;
        }else{
          //return result(null, res); TODO: didn't have time to error check this and see where in the flow we are setting headers
          // need to come back here and FIX THIS
        }
      })
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
  Rental.create = (req, result) => {
    sql.query(`insert into rental (roomNumber, roomProperty, startDT, endDT, clientFirstName, clientLastName) values
    ('${req.body.roomId}', '${req.body.propId}', '${req.body.startD}', '${req.body.endD}', '${req.body.firstName}', '${req.body.lastName}')`, (err, res) => {
      if(err){
        console.log("error: ", err);
        return;
      }
      sql.query(`delete rental
      from rental
      inner join (
      select max(rentalId) as lastId, roomNumber, roomProperty
      from rental
      group by roomNumber, roomProperty
      having count(*) > 1) duplic on duplic.roomNumber = rental.roomNumber
      AND duplic.roomProperty = rental.roomProperty
      WHERE rental.rentalId < duplic.lastId;`, (err, res) => {
        if(err){
          console.log("error in create rental delete duplicate rentals model = " + err);
          return;
        }else{
          return result(null, res);
        }
      })
    });
  };

Rental.deleteRental = (req, result) => {
  sql.query(`DELETE rental from rental WHERE roomNumber = ${req.body.roomId}`, (err, res) => {
    if(err){
      console.log('error in delete rental model = ' + err);
    }else{
      result(null, res);
    }
  })
}

  module.exports = Rental;