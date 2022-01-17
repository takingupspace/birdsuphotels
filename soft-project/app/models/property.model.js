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
  sql.query("SELECT * FROM rooms ro inner join rental r on r.roomNumber = ro.roomId WHERE isBooked = 1", (err, res) => {
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

Property.getCity = (req, result) => {

  // if (maxPrice == 500)
  //   maxPrice = 99999;
  // console.log("in here 1");
  console.log('bus ' + req.body.hasBusinessRoom)
  console.log('gym ' + req.body.hasGym)
  console.log('pool ' + req.body.hasPool)
  console.log('spa ' + req.body.hasSpa)
  console.log('req.body.roomType = ' + req.body.standardRoom + ' inside getCity Model')
  sql.query(`select * from properties inner join rooms on properties.propId = rooms.propId where city = '${req.body.city}' AND (roomType = '${req.body.standardRoom}' OR roomType = '${req.body.queenRoom}' OR roomType = '${req.body.kingRoom}')
  AND (properties.hasBusinessRoom = ${req.body.hasBusinessRoom} OR properties.hasGym = ${req.body.hasGym} OR properties.hasSpa = ${req.body.hasSpa} OR properties.hasPool = ${req.body.hasPool}) AND rooms.isBooked = 0`, (err, res) => {
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

Property.addProp = (req, result) => {
  sql.query(`INSERT INTO properties (propId, locationName, address, city, state, roomsAvailable, hasPool, hasSpa, hasBusinessRoom, hasGym, hasWifi, imgURL)
  VALUES ('${req.body.propId}', '${req.body.locationName}', '${req.body.address}', '${req.body.city}', '${req.body.state}', '${req.body.roomsAvailable}', '${req.body.hasPool}', '${req.body.hasSpa}',
  '${req.body.hasBusinessRoom}', '${req.body.hasGym}', '${req.body.hasWifi}', '${req.body.imgURL}')`, (err, res) => {
    if(err){
      console.log('err in add property model = ' + err);
      result(err, null);
    }else{
      result(null, res);
    }
  })
}


module.exports = Property;

