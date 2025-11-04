const mentionOf = (tags) => {
    return `@${tags['display-name'] || tags.username}`;
};

async function sendMulti(client, channel, text, delayms = 250) {
    const lines = String(text).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
        await new Promise(res => setTimeout(res, i * delayms));
        await client.say(channel, lines[i]);
    }
};

module.exports = { mentionOf, sendMulti };