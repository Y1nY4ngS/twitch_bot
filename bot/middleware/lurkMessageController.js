const lurkMessages = require('../../data/lurkMessages');
const welcomeBack = require('../../data/welcomeBack')
const checkExistingLurk = require('./lurkController')

async function lurkMessageController(username) {
    const checkEntry = await checkExistingLurk(username);

    if (checkEntry){
        const msgTemplate = welcomeBack[Math.floor(Math.random() * welcomeBack.length)]

        const hours = Math.floor(checkEntry / 60);
        const minutes = checkEntry % 60;

        let timeElapsed;
        if (hours > 0 && minutes > 0) {
            timeElapsed = `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            timeElapsed = `${hours}h`;
        } else {
            timeElapsed = `${minutes}m`;
        }
        const message = msgTemplate.replace('{{username}}', username).replace('{{timeElapsed}}', timeElapsed)

        return message;
    }

    const msgTemplate = lurkMessages[Math.floor(Math.random() * lurkMessages.length)];

    return msgTemplate.replace('{{username}}', username);
};

module.exports = lurkMessageController