import { MongoClient } from 'mongodb';

let client: MongoClient;

//  SINGLETON PATTERN POUR LE COLD START

export async function GetClient() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI, { monitorCommands: true });
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB!');
    }
    return client;
}
