import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8081 });

export function getWebSocketServer() {
  return server;
}
