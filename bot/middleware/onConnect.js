const startAutoMessage = require('./autoMessage');

function onConnect(client) {
    client.on('connect', (addr, port) => {
        console.log(`✅ Connected to ${addr}:${port}`);

        const channelName = process.env.TWITCH_CHANNEL || "y1ny4ngs";

        startAutoMessage(client, `#${channelName}`);
    })
}
module.exports =  onConnect ;