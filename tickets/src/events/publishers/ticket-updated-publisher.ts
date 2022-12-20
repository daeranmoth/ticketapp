import { Publisher, Subjects, TicketUpdatedEvent } from "@gcticketapp/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
