import { Router } from "express";
import {
  CreateNewTicket,
  DeleteTicket,
  EditTicket,
  GetTickets,
} from "../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.get("/tickets", GetTickets);

ticketRouter.post("/new-ticket", CreateNewTicket);

ticketRouter.post("/edit-ticket/:ticketID", EditTicket);

ticketRouter.post("/delete-ticket", DeleteTicket);

export default ticketRouter;
