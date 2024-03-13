import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { GetClient } from "../models/MongoClient";

export async function GetOrderByBikerId(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    const bikerId =  request.params.bikerId;
    if (!bikerId) {
        return { status: 400, body: 'bikerId query parameter is required' };
    }

    const client = await GetClient();
    const db = client.db("serverless");
    const orders = db.collection('bikerOrder');

    const bikerOrders = await orders.find({ bikerId });
    console.log("bikerOrders: ", bikerOrders);
    return { body: JSON.stringify(bikerOrders) };};

app.http('GetOrderByBikerId', {
    methods: ['GET'],
    route: 'BikerOrder/{bikerId}',
    authLevel: 'anonymous',
    handler:GetOrderByBikerId
});