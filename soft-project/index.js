const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require('cookie-parser')
var cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const path = require('path');
const http = require('http');
const {WebhookClient} = require('dialogflow-fulfillment');



// we use bodyParser to parse the HTTP request body
// allows us to morph the extracted payload
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser())

// allows us to parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "soft-project/views")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  return res.render("signup");
});

require('./app/routes/dialogflow.routes.js')(app);
require('./app/routes/customeremail.routes.js')(app);
require("./app/routes/email.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/property.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/rental.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
