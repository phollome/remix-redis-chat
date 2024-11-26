import { createClient } from "@redis/client";
import { getWebSocketServer } from "./ws.server";

let publisher: ReturnType<typeof createClient> | null = null;
let subscriber: ReturnType<typeof createClient> | null = null;

export async function createRedisClient() {
  const client = createClient({
    password: process.env.REDIS_PASSWORD,
  });
  await client.connect();
  return client;
}

export async function getPublisher() {
  if (publisher === null) {
    publisher = await createRedisClient();
  }

  return publisher;
}

export async function initializeSubscriber() {
  if (subscriber === null) {
    subscriber = await createRedisClient();
  }

  const webSocketServer = getWebSocketServer();
  subscriber.subscribe("messages", (message) => {
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  });

  return subscriber;
}
