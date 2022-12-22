import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@gcticketapp/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
