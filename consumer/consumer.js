import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566", // LocalStack
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test"
  }
});

const queueUrl = "http://localhost:4566/000000000000/sysprospect-queue";

async function pollMessages() {
  const command = new ReceiveMessageCommand({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 1,
  });

  const response = await sqs.send(command);

  if (response.Messages && response.Messages.length > 0) {
    for (const message of response.Messages) {
      console.log("Received:", message.Body);

      // Delete the message after processing
      await sqs.send(new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle
      }));
    }
  } else {
    console.log("No messages.");
  }
}

setInterval(pollMessages, 2000);
