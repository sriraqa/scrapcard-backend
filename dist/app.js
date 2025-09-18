"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI || "";
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
let usersCollection; //TODO: update to type
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect();
            // Send a ping to confirm a successful connection
            const db = client.db("scrapcard");
            yield db.command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            usersCollection = db.collection('users');
            app.use('/user', users_1.default);
            app.listen(port, () => {
                console.log(`Server running at http://localhost:${port}`);
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
function getUsersCollection() {
    if (!usersCollection) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return usersCollection;
}
module.exports = {
    connectToDatabase,
    getUsersCollection,
};
