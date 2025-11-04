const {isCommand, parseCommand} = require('../utils/parse');
const {sendMulti} = require('../utils/reply');
const linkFilter = require('./middleware/linkFilter');
const applyCooldown = require('./middleware/cooldowns');
const command = require('./command');
const  handleFirstTimeChatter = require('./middleware/firstTimeChatter')


function onMessage(client){
    return async (channel, tags, message, self) => {
        if (self) return;

        if (await linkFilter(client, channel, tags, message, self)) return;

        await handleFirstTimeChatter(client, channel, tags);

        if (!isCommand(message)) return;

        const {name, arg} = parseCommand(message);

        if (!applyCooldown(tags.username, name)) return;

        const cmd = command[name];
        if (!cmd) return;

        const raw = typeof cmd.response === 'function' ? cmd.response(tags.username, arg, tags, client, channel): cmd.response;

        if (!raw) return;
        await sendMulti(client, channel, raw);
    }  
};

module.exports = onMessage;