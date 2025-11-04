const getDB = require('./connect')

async function readLurk(username) {
    const db = await getDB();
    const col = db.collection('lurk');

    const usernameLower = String(username).toLocaleLowerCase();

    const doc = await col.findOne(
        {usernameLower},
        {projection: {_id: 0, username: 1, startedAt:1}}
    );

    if(!doc) {
        return null;
    }

    return {
        username: doc.username,
        time: doc.startedAt
    }
}

module.exports = readLurk;