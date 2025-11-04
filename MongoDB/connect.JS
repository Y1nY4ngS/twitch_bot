const {MongoClient} = require('mongodb');

let client;
let db;

async function getDB() {
    if (db) {
        return db;
    }

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    if (!uri || !dbName) {
        throw new Error('Missing env information')
    }

    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
    }

    db = client.db(dbName)
    return db;
}

module.exports = getDB;