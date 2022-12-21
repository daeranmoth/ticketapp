import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from "@gcticketapp/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //find the ticket the user tries to order in the database
    const { ticketId } = req.body; //we destructure out the ticketID from the req.body
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    //verify that the ticket is not already reserved

    //calculate a reservation timeframe for this order

    //Build the order and save it to database

    //Publish an event order created

    res.send({});
  }
);

export { router as newOrderRouter };
