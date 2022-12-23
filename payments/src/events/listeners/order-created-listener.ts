import { Listener, OrderCreatedEvent, Subjects } from "@gcticketapp/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // build the order
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    // if no order exists, throw an error
    if (!order) {
      throw new Error("order not found");
    }

    // Save the order
    await order.save();
    //publish an event for events sync
    // await new OrderUpdatedPublisher(this.client).publish({
    //   id: order.id,
    //   price: order.price,
    //   title: order.title,
    //   userId: order.userId,
    //   orderId: order.orderId,
    //   version: order.version,
    // });
    // ack the message
    msg.ack();
  }
}
