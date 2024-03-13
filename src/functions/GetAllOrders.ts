import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GetClient } from "../models/MongoClient";

export async function GetAllOrders(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = await GetClient();
    const db = client.db("serverless");
    const BikerOrder = db.collection('bikerOrder');
    const orders = await BikerOrder.find();
    return { 
        body: JSON.stringify(orders),
        status: 200 
    }
}

app.http('GetAllOrders', {
    methods: ['GET'],
    route: "orders",
    authLevel: 'anonymous',
    handler: GetAllOrders
});
