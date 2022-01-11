const sql = require('./db.js');
const {WebhookClient} = require('dialogflow-fulfillment');

const Dialog = function(dialogFlow){
    // ??
}

Dialog.chatBotFlow = (req, result) => {
    let agent = new WebhookClient({request : req, response :res})

    let intentMap = new Map();

    intentMap.set('webhook-demo', handleWebHookIntent);

    agent.handleRequest(intentMap);
}

function handleWebHookIntent(agent){
    agent.add('Hello I am webhook demo, how are you?')
}