/*
 * @cron job
 * @function sendMessage()
 */

//Create the Cron job which can run a function every hour
const cron = require('node-cron');

// Connect to Twilio API
const config = require('./config');
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const messages = require('./message'); // Import message array to be sent

var curMessage = 0; // traverses message array

function sendMessage() {
    client.messages
        .create({
            body: messages[curMessage],
            from: '+19158000472',
            to: config.PHONE_NR
        })
        .then(message => {
            curMessage++;
            console.log(message);
        });
}

//Schedule the cron job every hour
cron.schedule('0 * * * *', () => {
    console.log('running a task every hour');
    sendMessage();
});