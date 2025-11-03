const urlRegex = /(https?:\/\/|www\.)\S+/i;
const bareDomainRegex = /\b[a-z0-9-]+\.(com|net|org|io|gg|tv|app|co|info|dev)(\/\S*)?\b/i;

async function linkFilter(channel, tags, message, self, client){
    const isModOrBroadcaster = tags.mod == true || (tags.badges && tags.badges.broadcaster === '1');

    if (self || isModOrBroadcaster) return;

    if(urlRegex.test(message) || bareDomainRegex.test(message)){
        const displayName = tags['display-name'] || tags.username;
        const msgId = tags.id;

        try {
            if (msgId) {
                await client.deletemessage(channel, msgId);
            }
            await client.say(channel, `@${displayName}, posting links is not allowed in this channel. 10 Second timeout.`);
            await client.timeout(channel, displayName, 10, 'Posting links is not allowed.');
        } catch (err){
            console.error('Moderation error:', err);
            await client.say(channel, `I tried to delete a link, but I need moderator permissions.`);
        }

        return true;
    }
    
    return false;
}

module.exports = { linkFilter };