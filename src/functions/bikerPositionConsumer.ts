import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Kafka, Consumer } from "kafkajs";
const kafka = new Kafka({
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'biker-group' });
export async function bikerPositionConsumer(req: HttpRequest): Promise<any> {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: 'bikerPosition', fromBeginning: true });
  
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const coordinates = message.value.toString(); 
            console.log(`Received message: ${coordinates} from topic ${topic} on partition ${partition}`);        
        },
      });
    } catch (error) {
      console.log(`Error occurred: ${error}`);
    }
  }
app.http('bikerPositionConsumer', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: bikerPositionConsumer
});
