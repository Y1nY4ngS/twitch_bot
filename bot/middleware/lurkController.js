const { writeLurk, updateLurkTime } = require('../../MongoDB/lurk/write')
const readLurk = require('../../MongoDB/lurk/read')

async function checkExistingLurk(username) {
    const lurkEntry = await readLurk(username);
    const day = 24*60*60*1000;
    const twentyMinutes = 20*60*1000

    if (!lurkEntry) {
        await writeLurk(username);
        return null;
    }

    const elapsedMs = Date.now() - new Date(lurkEntry.time).getTime();
    const elapsedMinutes = Math.floor(elapsedMs / (60 * 1000))
    
    if (elapsed > day) {
        await updateLurkTime(username)
        return null;
    }

    if (elapsed < twentyMinutes) {
        await updateLurkTime(username)
        return null;
    }

    return elapsedMinutes;
}

module.exports = checkExistingLurk;