require('dotenv').config();
const { createClient } = require('./bot/client');
const { onMessage } = require('./bot/handler');
const { onConnect } = require('./bot/middleware/onConnect');
const {validateEnv} = require('./utils/config');

validateEnv();

const client = createClient();
client.connect();

onConnect(client);
client.on('message', onMessage(client));