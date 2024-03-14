import { Kafka, Admin } from "kafkajs";

const kafka = new Kafka({
  brokers: ['localhost:9092'], 
});

const admin = kafka.admin();

async function createTopic(topicName: string): Promise<void> {
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic: topicName }],
  });
  await admin.disconnect();
}

export async function addDriver(driverId: string): Promise<void> {
  const topicName = `driver-coordinates-${driverId}`;
  await createTopic(topicName);
}