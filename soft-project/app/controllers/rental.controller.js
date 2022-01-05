const Rental = require("../models/rental.model.js");

exports.createRental = (req, res) => {
    Rental.create(req.body.propId, req.body.userId, req.body.propId, req.body.startD, req.body.endD, req.body.firstName, req.body.lastName, (err, data) => {
      console.log('inside create Rental')
      if (err)
        res.status(500).send({
          message:
            err.message || "Could not insert into rentals."
        });
      else res.send(req.body);
    });
  };
// exports.updateBooking = (req, res) => {
//     if(!req.body){
//       res.status(400).send({
//         message: "You didn't input the fields needed to find the booking."
//       });
//     }
//     // see what data has been sent
//     console.log("room ID is = " + roomID);
//     console.log("roomOwner is " + roomOwner)
//     console.log("isBooked is = " + isBooked)
  
//     Rental.updateBookingQuery(
//       req.body.firstName,
//       req.body.lastName,
//       req.body.isBooked,
//       req.body.locationName,
//       req.body.city,
//       req.body.state,
//       req.body.roomID,
//       req.body.propertyID,
//       req.body.roomOwner,
//       (err, data) => {
//         if(err){
//           if(err.kind === "not_found"){
//             res.status(404).send({
//               message: "This property doesn't exist" + req.params.locationName
//             });
//           }else{
//             res.status(500).send({
//               message: "Couldn't update this Property at this location, misc. error server-side " + JSON.stringify(req.params)
//             });
//           }
//           // could use res.json here, it calls res.send, but it performs some JSON validation first,
//           // which means it's able to handle null and undefined which are not valid JSON
//         }else res.send(data);
//       }
//     );
//   };

/*
########################################## NOT IN USE ###########################################################
*/