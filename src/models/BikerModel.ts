import mongoose, { Schema, Document, createConnection, ConnectOptions } from 'mongoose';

const bikerOrderSchema = new Schema({
  id: Schema.Types.ObjectId,
  bikerId: String,
  customerName: String,
  deliveryAddress: String,
  orderItems: [String],
  orderStatus: String,
  orderTime: Date,
});

export interface IOrder {
  bikerId: string;
  customerName: string;
  deliveryAddress: string;
  orderItems: string[];
  orderStatus: string;
  orderTime: Date;
}

export interface IOrderDocument extends IOrder, Document {
  id: string;
  created: Date;
}


const connectionString = process.env.MONGODB_URI;
if (!connectionString) {
  throw new Error('MONGODB_URI is not defined');
}

const connection = createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
} as ConnectOptions);

export const BikerOrder = connection.model<IOrderDocument>('BikerOrder', bikerOrderSchema);

export default connection;