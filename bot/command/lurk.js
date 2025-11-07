// bot/middleware/lurk.js
const lurkMessages = require('../../data/lurkMessages');
const welcomeBack = require('../../data/welcomeBack');
const writeLurk = require('../../MongoDB/lurk/write');
const readLurk = require('../../MongoDB/lurk/read');
const updateLurkTime = require('../../MongoDB/lurk/update');

const DAY_MS = 24 * 60 * 60 * 1000;
const TWENTY_MIN_MS = 20 * 60 * 1000;

function formatElapsed(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 || m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
}

async function handleLurk(username) {
    const lurkEntry = await readLurk(username)

    if (!lurkEntry) {
        await writeLurk(username);
        const tmpl = lurkMessages[Math.floor(Math.random() * lurkMessages.length)];
        return tmpl.replace(`{{username}}`, username);
    }

    const lastTime = new Date(lurkEntry.time).getTime();
    const now = Date.now;
    const elapsedMS = now-lastTime;
    const elapsedMinutes = Math.floor(elapsedMS / (60 * 1000));

    if (elapsedMS > DAY_MS) {
        
        await updateLurkTime(username)
        return null;
    }

    if (elapsedMS < TWENTY_MIN_MS) {
        await updateLurkTime(username)
        return null
    }

    const elapsedLabel = formatElapsed(elapsedMinutes);
    const backTmpl = welcomeBack[Math.floor(Math.random() * welcomeBack.length)];
    await updateLurkTime(username);
    return backTmpl.replace('{{username}}', username).replace('{{timeElapsed}}', elapsedLabel);
}

module.exports = { handleLurk };