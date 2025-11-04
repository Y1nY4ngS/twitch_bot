const fetch = require('node-fetch');

let cachedToken = null;
let expiryTs = 0;

async function getAppToken() {
    const now = Date.now();
    if (cachedToken && now < expiryTs - 60_000) {
        return cachedToken;
    }

    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error('Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in environment variables');
    }

    const res = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
        })
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to get Twitch app token: ${res.status} ${txt}`);
    }

    const data = await res.json();
    cachedToken = data.access_token;
    expiryTs = now + data.expires_in * 1000;
    return cachedToken;
}
module.exports =  getAppToken ;