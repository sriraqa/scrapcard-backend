// Run `npx ts-node createcollection.ts` to create collection in MongoDB with schema validation

import dotenv from 'dotenv';

dotenv.config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function updateSchema() {
    try {
        await client.connect();
        const db = client.db("scrapcard");
        await db.command({
            collMod: "users",
            validator: {
                $jsonSchema: {
                    // new schema here
                }
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const myDb = client.db("scrapcard");
        await myDb.createCollection("scrapcards", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["userId", "createdAt", "lastUpdated", "orientation", "theme"],
                    properties: {
                        userId: {
                            bsonType: "string",
                        },
                        title: {
                            bsonType: "string",
                        },
                        createdAt: {
                            bsonType: "date",
                        },
                        lastUpdated: {
                            bsonType: "date",
                        },
                        thumbnail: {
                            bsonType: "string",
                        },
                        orientation: {
                            enum: ["landscape", "portrait"],
                            description: "can only be one of the enum values"
                        },
                        theme: {
                            bsonType: "string",
                        },
                    },
                },
            },
        });

    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);