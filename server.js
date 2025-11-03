require('dotenv').config();
const { createClient } = require('./bot/client');
const { onMessage } = require('./bot/handler');
const {validateEnv} = require('./utils/config');

validateEnv();

const client = createClient();
client.connect();

client.on('message', onMessage(client));