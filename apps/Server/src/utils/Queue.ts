import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'gather-town',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendMessage(topic: string, message: any) {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}

const consumer = kafka.consumer({ groupId: 'gather-group' });

async function consumeMessages(topic: string) {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message?.value?.toString(),
      });
    },
  });
}
