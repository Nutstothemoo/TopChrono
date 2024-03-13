import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GetClient } from "../DbClient/MongoClient";

export async function GetBikerOrder(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    const bikerId =  request.params.bikerId;
    if (!bikerId) {
        return { status: 400, body: 'bikerId query parameter is required' };
    }

    const client = await GetClient();
    const db = client.db("serverless");
    const orders = db.collection('bikerOrder');

    const bikerOrders = await orders.find({ bikerId }).toArray();

    return { body: JSON.stringify(bikerOrders) };};

app.http('GetDeliveryRequest', {
    methods: ['GET'],
    route: 'BikerOrder/{bikerId}',
    authLevel: 'anonymous',
    handler: GetBikerOrder
});