module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    const {verify} = require('../../authorization.js');
    const auth = require('../controllers/auth.controller.js')

    // Create a new Customer
    app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/customers", customers.findAll);

    // Retrieve customer ID, First and LastName from their email
    app.post("/customers/:customerEmail", auth.verify, customers.findUsingEmail);
  
    // Retrieve a single Customer with customerId
    app.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/customers/:customerId", customers.delete);
  
    // Deletes all Customers
    app.delete("/customers", customers.deleteAll);
  };