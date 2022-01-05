const Property = require("../models/property.model.js"); // this is so that we can access our Property module which is exported within the property.model file

exports.findCity = (req, res) => {

  Property.getCity(req.body.city, req.body.hasBusinessRoom, req.body.hasGym, req.body.hasPool, req.body.hasSpa, 
    req.body.standardRoom, req.body.queenRoom, req.body.kingRoom, 
    req.body.minPrice, req.body.maxPrice, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: "Couldn't find any properties at city: " + "\"" + req.body.city + "\""
        });
      } else {
        res.status(500).send({
          message: "Error retrieving property with city: " + req.params.city
        });
      }
    } else res.send(data);
  });
};

exports.updateAvailability = (req, res) => {
  Property.updateAvail(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating."
      });
    else {
      //console.log(data)
      res.send(data);
    }
  });
};

exports.findAvailableProperties = (req, res) => {
  Property.getAvailableProperties((err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Some other error occured"
      });
    }else res.send(data);
  });
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