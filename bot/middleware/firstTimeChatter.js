const welcomeMessages = require('../../data/welcomeMessages');

async function handleFirstTimeChatter(client, channel, tags){
    if(tags['first-msg']){
        const username = tags['display-name'] || tags.username;

        const msgTemplate = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        const msg = msgTemplate.replace('{{username}}', username);

        try {
            await client.say(channel, msg);
        } catch (err) {
            console.error('Error sending welcome message:', err);
        } 

        return true;
    }
    return false;
};

module.exports =  handleFirstTimeChatter ;