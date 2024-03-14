import { Kafka, Consumer } from "kafkajs";
import { app, InvocationContext } from "@azure/functions";
const kafka = new Kafka({
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'biker-group' });

const kafkaBikerSubscriber = async function (context: InvocationContext ): Promise<void> {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'driver-coordinates-biker123', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const coordinates = message.value.toString(); 
        context.log(`Received message: ${coordinates} from topic ${topic} on partition ${partition}`);        
      },
    });
  } catch (error) {
    context.log(`Error occurred: ${error}`);
  }
};

export default kafkaBikerSubscriber;