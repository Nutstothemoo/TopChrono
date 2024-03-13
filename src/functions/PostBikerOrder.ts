import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GetClient } from "../models/MongoClient";


export async function PostBikerOrder(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = await GetClient();
    const db = client.db("serverless");
    const orders = db.collection('bikerOrder');

    const bikerOrder = await request.json();
    if (!bikerOrder) {
        return { status: 400
          , body: 'Biker Order is required' };
    }
    const result = await orders.insertOne(bikerOrder);

    return { body: JSON.stringify(result) };
};

app.http('PostBikerOrder', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'BikerOrder',
  handler: PostBikerOrder
});