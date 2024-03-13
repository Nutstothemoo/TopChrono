import { GetOrderByBikerId } from "../functions/GetOrderByBikerId";
import * as dotenv from 'dotenv';
dotenv.config();

// Mock pour HttpRequest et InvocationContext
const mockHttpRequest: any = {
    params: { bikerId: "biker123" },
    method: "GET",
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
        const response = await GetOrderByBikerId(mockHttpRequest, mockInvocationContext);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should return a 400 error when bikerId is missing', async () => {
        const requestWithoutBikerId: any = { 
            params: { bikerId: "" },
        };
        const response = await GetOrderByBikerId(requestWithoutBikerId, mockInvocationContext);
        expect(response.status).toBe(400);
        expect(response.body).toBe('bikerId query parameter is required');
    });
});