import dotenv from 'dotenv';
dotenv.config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI || "";

let usersCollection: any;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        const db = client.db("scrapcard");
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        usersCollection = db.collection('users');
    } catch (e) {
        console.error(e);
    }
}

function getUsersCollection() {
    if (!usersCollection) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return usersCollection;
}

export { connectToDatabase, getUsersCollection };