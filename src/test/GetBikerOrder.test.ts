import { HttpRequest, InvocationContext } from "@azure/functions";
import { GetBikerOrder } from "../functions/GetBikerOrder";
import { Blob } from "buffer";
import { FormData } from "undici";

// Mock pour HttpRequest et InvocationContext
const mockHttpRequest: any = {
    query: new URLSearchParams('biker123'),
    method: "GET",
    url: "http://localhost:7071/api/GetBikerOrder?bikerId=biker123",
};

const mockInvocationContext: any = {
    invocationId: "someInvocationId",
    functionName: "GetBikerOrder",
    extraInputs: undefined,
    extraOutputs: undefined,
    log: function (...args: any[]): void {
        console.log(...args);
    },
    trace: function (...args: any[]): void {
        console.trace(...args);
    },
    debug: function (...args: any[]): void {
        console.debug(...args);
    },
    info: function (...args: any[]): void {
        console.info(...args);
    },
    warn: function (...args: any[]): void {
        console.warn(...args);
    },
    error: function (...args: any[]): void {
        console.error(...args);
    },
    options: undefined
};

describe('GetBikerOrder function', () => {
    it('should return a valid response when bikerId is provided', async () => {
        const response = await GetBikerOrder(mockHttpRequest, mockInvocationContext);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should return a 400 error when bikerId is missing', async () => {
        const requestWithoutBikerId: any = { 
            query: new URLSearchParams(''), 
            url: "http://localhost:7071/api/GetBikerOrder?bikerId=",
        };
        const response = await GetBikerOrder(requestWithoutBikerId, mockInvocationContext);
        expect(response.status).toBe(400);
        expect(response.body).toBe('bikerId query parameter is required');
    });
});