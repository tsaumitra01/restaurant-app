const accountSid = 'AC5394b4ffa992c82c61b43f58f23fb81d';
const authToken  = '8408a22a5ff9eaf88b3d6e39c31c0695';
const client     = require('twilio')(accountSid, authToken);

module.exports = client;