const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ['localhost:9092']
});

const admin = kafka.admin();

const createTopic = async () => {
  await admin.connect();
  await admin.createTopics({
    topics: [
      { topic: 'bikerPosition', numPartitions: 3, replicationFactor: 1 }
    ]
  });
  await admin.disconnect();
};

createTopic().then(() => console.log('Topic created successfully'));