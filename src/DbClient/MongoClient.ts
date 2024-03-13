import { MongoClient } from 'mongodb';
import { Schema, Document, createConnection, ConnectOptions, model, set } from 'mongoose';

let client: MongoClient;

//  SINGLETON PATTERN POUR LE COLD START

export async function GetClient() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI, { monitorCommands: true });
        client.on('commandStarted', started => console.log(started));
        await client.connect();
    }
    return client;
}


const connectionString = process.env.MONGODB_URI;
console.log('connectionString', connectionString);

const connection = createConnection(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
} as ConnectOptions);

export interface Iorder {
  author: string
  title: string
  body: string
}

export interface IorderDocument extends Iorder, Document {
    id: string
    created: Date
}

const bikerOrderSchema = new Schema({
    id: Schema.Types.ObjectId,
    author: String,
    title: String,
    body: String,
});


bikerOrderSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export const BikerOrder = model<IorderDocument>('BikerOrder', bikerOrderSchema);
connection.model('BikerOrder', bikerOrderSchema);

export default connection;