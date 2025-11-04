const lurkMessages = require('../../data/lurkMessages');

function lurkMessageController(username) {
    const msgTemplate = lurkMessages[Math.floor(Math.random() * lurkMessages.length)];

    return msgTemplate.replace('{{username}}', username);
};

module.exports = lurkMessageController