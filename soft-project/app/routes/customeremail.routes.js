module.exports = app => {
const custemail = require('../controllers/customeremail.controller.js');

app.post('/sendCustomerEmail', custemail.sendCustomerEmail);

}