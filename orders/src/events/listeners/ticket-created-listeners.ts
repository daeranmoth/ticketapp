import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@gcticketapp/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  //the subject of the listener is immutable via typescript
  readonly subject = Subjects.TicketCreated;
  //the queue group name
  queueGroupName = queueGroupName;
  // the business logic
  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
