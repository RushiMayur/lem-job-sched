import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "job-scheduler",
  brokers: ["localhost:9092"], // change if you're using a remote broker
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const disconnectProducer = async () => {
  await producer.disconnect();
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const job = req.body;

  try {
    // Always connect to the producer for each request
    await connectProducer();

    await producer.send({
      topic: "jobs-topic", // make sure this topic exists in Kafka
      messages: [{ value: JSON.stringify(job) }],
    });

    // Disconnect after sending the message
    await disconnectProducer();

    return res.status(200).json({ message: "Job scheduled successfully" });
  } catch (error) {
    console.error("Kafka Error:", error);
    return res.status(500).json({ message: "Kafka scheduling failed", error });
  }
}
