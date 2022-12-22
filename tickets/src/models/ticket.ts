import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// Attibutes required to create a new Ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// An interface that describes the properties
// that a Ticket Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string; //tells typescript that orderId is a string or undefined
}

// An interface that describes the properties
// that a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String, //global string constructor in javascript
      required: true,
    },
    price: {
      type: Number, //global number constructor in javascript
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id; //remove _id property from the return object
      },
    },
  }
);
//this mongoose plugin is to handle Optimistic Concurrency Control
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

//build function to allow typescript to do is job (type checking)
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
// we create the mongodb collection
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
