import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { createRedisClient, getPublisher } from "~/redis.server";

export async function action(args: ActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const message = formData.get("message");

  if (typeof message === "string") {
    const publisher = await getPublisher();
    await publisher.publish("messages", message);
  }

  return redirect(".");
}

function Publish() {
  return (
    <Form method="post">
      <label>Message</label>
      <input type="text" name="message" />
      <button type="submit">Publish</button>
    </Form>
  );
}

export default Publish;
