#!/bin/bash
set -e

echo "Creating SNS topic..."
TOPIC_ARN=$(awslocal sns create-topic --name sysprospect-topic --query 'TopicArn' --output text)
echo "SNS Topic ARN: $TOPIC_ARN"

echo "Creating SQS queue..."
QUEUE_URL=$(awslocal sqs create-queue --queue-name sysprospect-queue --query 'QueueUrl' --output text)
echo "SQS Queue URL: $QUEUE_URL"

QUEUE_ARN=$(awslocal sqs get-queue-attributes \
  --queue-url "$QUEUE_URL" \
  --attribute-name QueueArn \
  --query 'Attributes.QueueArn' \
  --output text)

echo "Subscribing SQS to SNS..."
awslocal sns subscribe \
  --topic-arn "$TOPIC_ARN" \
  --protocol sqs \
  --notification-endpoint "$QUEUE_ARN"
