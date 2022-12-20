import { Publisher, Subjects, TicketCreatedEvent } from "@gcticketapp/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
