const tmi = require('tmi.js');

function createClient() {
    return new tmi.Client({
        options: { debug: true },
        identity: {
            username: process.env.TWITCH_BOT_USERNAME,
            password: process.env.TWITCH_OAUTH_TOKEN
        },
        channels: [process.env.TWITCH_CHANNEL],
    });
};

module.exports = createClient