import React from "react";

function Subscribe() {
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8081");
    webSocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <div>
      <h1>Subscribe</h1>
      {messages.map((message, index) => {
        return <p key={`message-${index}`}>{message}</p>;
      })}
    </div>
  );
}

export default Subscribe;
