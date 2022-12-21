import { Publisher, OrderCreatedEvent, Subjects } from "@gcticketapp/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
