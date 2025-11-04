const fetch = require('node-fetch');
const getAppToken = require('./twitchAuth');

const MIN_INTERVAL = 4*60*1000; // 4 minutes
const MAX_INTERVAL = 10*60*1000; // 10 minutes

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CHANNEL = process.env.TWITCH_CHANNEL;
const STREAMER_DISPLAY_NAME = process.env.STREAMER_DISPLAY_NAME || 'Y1n Y4ngS';

async function getCurrentStreamInfo() {
    if (!TWITCH_CLIENT_ID || !TWITCH_CHANNEL) {
        return { live: false, game: 'something fun', title: ''};
    }

    try {
        const appToken = await getAppToken();

        const uRes = await fetch(`https://api.twitch.tv/helix/users?login=${TWITCH_CHANNEL}`, {
            headers: {
                'Client-ID': TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${appToken}`,
            },
        });
        const uData = await uRes.json();
        if (!uData.data?.length) return { live: false, game: 'something fun', title: ''};
        const userId = uData.data[0].id;

        const sRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
            headers: {
                'Client-ID': TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${appToken}`,
            },
        });
        const sData = await sRes.json();

        if (!sData.data?.length) {
            return { live: false, game: 'just chatting with everyone', title: ''};
        }

        const stream = sData.data[0];
        return {
            live: true,
            game: stream.game_name || 'something fun',
            title: stream.title || '',
        };
    } catch (err) {
        console.error('Error fetching stream info:', err);
        return { live: false, game: 'something fun', title: ''};
    }
}

function startAutoMessage(client, channel) {
    async function sendMessage() {
        const { live, game, title} = await getCurrentStreamInfo();

        const msg = `🎉 Welcome to the stream! ${STREAMER_NAME} is currently playing ${game}. 🕹️ ${title ? `— “${title}”` : ''}`.trim();

        try {
            await client.say(channel, msg);
        } catch (err) {
            console.error('[autoMessage] send failed', err);
        }

        const next = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
        setTimeout(sendMessage, next);
    }

    const initial = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
    setTimeout(sendMessage, initial);
};

module.exports = startAutoMessage;