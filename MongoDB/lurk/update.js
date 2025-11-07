const getDB = require('../connect');

async function updateLurkTime(username) {
    const db = await getDB();
    const col = db.collection('lurk');

    const userNameLower = String(username).toLowerCase();

    const result = await col.updateOne(
        {userNameLower},
        {$set: {startedAt: new Date(time)}},
        {upsert: false}
    );

    if (result.matchedCount === 0) {
        console.log(`No existing lurk found for ${username}`);
    } else {
        console.log(`Updated lurk time for ${username}`);
    }

    return result;
}

module.exports = updateLurkTime;