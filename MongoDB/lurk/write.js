const getDB = require('../connect');

async function writeLurk(username, time = new Date()) {
    const db = await getDB();
    const col = db.collection('lurk');

    const userNameLower = String(username).toLowerCase();

    await col.updateOne(
        {userNameLower},
        {
            $set: {
                username,
                userNameLower,
                startedAt: new Date(time),
            },
        },
        {
            upsert: true
        }
    )

    return {username, time: new Date(time)}
}

module.exports = writeLurk;