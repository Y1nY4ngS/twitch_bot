const getDB = require('./connect');

async function writeLurk(username, time = new Date()) {
    const db = await getDB();
    const col = db.collection('lurk');

    const userNameLower = String(username).toLowerCase();

    await col.updateOne(
        {usernameLower},
        {
            $set: {
                username,
                usernameLower,
                startedAt: new Date(time),
            },
        },
        {
            upsert: true
        }
    )

    return {username, time: new Date(time)}
}

async function updateLurkTime(username) {
    const db = await getDB();
    const col = db.collection('lurk');

    const userNameLower = String(username).toLowerCase();

    const result = await col.updateOne(
        {usernameLower},
        {$set: {startedAt: new Date(time)}},
        {upsert: false}
    );
}

module.exports = { writeLurk, updateLurkTime }