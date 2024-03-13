import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GetClient } from "../DbClient/MongoClient";

export async function PostBikerOrder(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    const bikerOrder = request.body;
    if (!bikerOrder) {
        return { status: 400, body: 'Request body is required' };
    }

    const client = await GetClient();
    const db = client.db("serverless");
    const orders = db.collection('bikerOrder');
    const result = await orders.insertOne(bikerOrder);

    return { body: JSON.stringify(result) };
};

app.http('PostBikerOrder', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'BikerOrder',
  handler: PostBikerOrder
});