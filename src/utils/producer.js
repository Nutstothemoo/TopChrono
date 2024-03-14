const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function produceMessage(topic, message) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
}

// Usage example
async function main() {
  await produceMessage('driver-coordinates-biker123', 'Message 1');
  await produceMessage('driver-coordinates-biker123', 'Message 2');
}

main();