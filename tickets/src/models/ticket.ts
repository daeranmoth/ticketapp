import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// An interface that describes the properties
// that a User Document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// An interface that describes the properties
// that a User Model has
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
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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

//build function to allow typescript to do type checking
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
// we create the mongodb collection
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
