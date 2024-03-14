const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: '0',
  brokers: ['localhost:9092'],
  }
);

const config = {
  intervalMS:500,
  messageNumber:50
}

async function produceMessage(topic, message) {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  }
  );
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
}


async function main() {
  let messageNumber = 1;
  const intervalId = setInterval(async () => {
    if (messageNumber > config.messageNumber) {
      clearInterval(intervalId);
      console.log('Stopped sending messages.');
    } else {
      const coordinates = {
        latitude: Math.random() * 100, 
        longitude: Math.random() * 100,
      };
      await produceMessage('bikerPosition', JSON.stringify(coordinates));
      // console.log(`Message ${messageNumber} : ${ JSON.stringify(coordinates)}`);
      messageNumber++;
    }
  }, config.intervalMS); 
}
main();