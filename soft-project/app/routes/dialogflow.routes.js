module.exports = app => {
    const dialog = require('../controllers/dialogflow.controller.js');
    app.post('/dialogflow', dialog.chatBot);
}