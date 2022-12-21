import { Publisher, OrderCancelledEvent, Subjects } from "@gcticketapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
