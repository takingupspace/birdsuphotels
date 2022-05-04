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
const multer = require('multer');

// we use bodyParser to parse the HTTP request body
// allows us to morph the extracted payload
app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser())

app.use('/images', express.static('images'));

// allows us to parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "soft-project/views")));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get('/uploads/:imgName', function(req, res){
  console.log('the image that was requested was ' + req.params.imgName);
  var imageName = req.params.imgName;
  res.sendFile(__dirname + "/images/" + imageName);
})

const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, 'images');
  },
  // limits : {
  //   fileSize : 1000000 // this is 1 MB
  // },
  // fileFilter(req, file, cb){
  //   if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
  //     cb(new Error('Incorrect type of image, please use the file extensions: png, jpg, or jpeg'))
  //   }

  //   cb(undefined, true)
  // }
  filename : function ( req, file, cb){
    cb(null, file.originalname);
  }
});

var upload = multer({storage : storage})

app.get('/google/logo', function(req, res){
  res.writeHead(302, {
    location : "https://www.google.com/images/srpr/logo11w.png"
  })
  res.end();
})

app.post('/upload', upload.single('image'), (req, res) => {
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

app.get("/", (req, res) => {
  return res.render("signin");
});

require('./app/routes/dialogflow.routes.js')(app);
require('./app/routes/customeremail.routes.js')(app);
require("./app/routes/email.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/property.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/rental.routes.js")(app);
require("./app/routes/query.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
