const sql = require("./db.js");

// constructor
const Property = function(property) {
  this.locationName = property.locationName;
  this.city = property.city;
  this.state = property.state;
  this.hasPool = property.hasPool; // has to be a 0 or 1
  this.hasSpa = property.hasSpa;
  this.hasBusinessRoom = property.hasBusinessRoom;
};
Property.getAll = result => {
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

Property.getAvailableProperties = result => {
  sql.query("SELECT * FROM properties p, rooms r WHERE p.propId = r.propId AND r.isBooked = 1", (err, res) => {
    if(err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("properties booked are: ", res);
    result(null, res);
  });
};

Property.updateAvail = (req, result) => {
  sql.query("UPDATE properties p set p.roomsAvailable = (select COUNT(r.isBooked) from rooms r where r.isBooked = 0 and r.propId = p.propId)", (err, res) => {
    if (err) {
      console.log("error with updating", err);
      result(null, err);
      return;
    }

    console.log("success updating in update avail");
    result(null, res);
  });
};

Property.getCity = (passedCityVar, passedBusinessR, passedGym, passedPool, passedSpa, standardRoom, queenRoom, kingRoom, minPrice, maxPrice, result) => {

  if (maxPrice == 500)
    maxPrice = 99999;
  console.log("in here 1");
  sql.query("SELECT * FROM properties inner join rooms on properties.propId = rooms.propId WHERE city = ? AND hasBusinessRoom = ? AND hasGym = ? AND hasPool = ? AND hasSpa = ? AND (roomType = ? OR roomType = ? OR roomType = ?) AND totalCost > ? AND totalCost < ? AND rooms.isBooked = 0", [passedCityVar, passedBusinessR, passedGym, passedPool, passedSpa, standardRoom, queenRoom, kingRoom, minPrice, maxPrice], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("in here 2");
    if (res.length == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("properties at this city: ", res);
    result(null, res);
  });
};

Property.clientBookings = (req, result) => {
  sql.query(`select * from rental r inner join customers c on r.clientFirstName = c.firstName AND r.clientLastName = c.lastName AND c.email = '${req.body.email}' inner join properties p on p.propId = r.roomProperty`, (err, res) => {
    if(err){
      result(err, null)
    }else{
      result(null, res);
    }
  })
}


module.exports = Property;

