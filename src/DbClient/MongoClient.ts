import { MongoClient } from 'mongodb';

let client: MongoClient;

//  SINGLETON PATTERN POUR LE COLD START

export async function GetClient() {
    if (!client) {
        client = new MongoClient('mongodb+srv://maxime:fuegfueg@cluster0.a4qkhgg.mongodb.net/', { monitorCommands: true });
        client.on('commandStarted', started => console.log(started));
        await client.connect();
    }
    return client;
}