import { Asset } from "../model/asset.model.js";
import { Ticket } from "../model/ticket.model.js";

const GetTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().select(
      "-_id -createdAt -updatedAt -__v"
    );
    return res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.error("ERROR FETCHING TICKETS: ", error);
    return res.status(500).json({
      message: "Error fetching data",
    });
  }
};

const CreateNewTicket = async (req, res) => {
  try {
    const ticket = req.body;
    for (const field in ticket) {
      if (ticket[field] === "") {
        return res.status(400).json({
          message: `${field} is required`,
        });
      }
    }
    const { ticketID } = ticket;
    const motorID = ticket.assetID;

    const existingTicketID = await Ticket.findOne({ ticketID });
    if (existingTicketID) {
      return res.status(400).json({
        message: "TicketID already exists",
      });
    }

    const validateMotorID = await Asset.findOne({ motorID });
    if (!validateMotorID) {
      return res.status(400).json({
        message: "MotorID does not exists",
      });
    }

    await Ticket.create(ticket);
    return res.status(201).json({
      message: "Ticket created successfully",
    });
  } catch (error) {
    console.log("ERROR CREATING TICKET", error);
    return res.status(500).json({
      message: "Try again later",
    });
  }
};

const EditTicket = async (req, res) => {
  try {
    const ticketID = req.params.ticketID;
    const editFields = req.body;

    if (editFields.assetID) {
      const asset = await Asset.findOne({ motorID: editFields.assetID });
      if (!asset) {
        return res.status(400).json({
          message: "Asset ID not found",
        });
      }
    }

    await Ticket.findOneAndUpdate({ ticketID: ticketID }, editFields, {
      new: true,
    });

    return res.status(200).json({
      message: "Save changes successfull",
    });
    return;
  } catch (error) {
    console.log("ERROR  UPDATING TICKET", error);
    return res.status(500).json({
      message: "Try again later",
    });
  }
};

const DeleteTicket = async (req, res) => {
  try {
    const ticketID = req.body.ticketToDelete;

    const deletedTicket = await Ticket.findOneAndDelete({ ticketID });
    if (deletedTicket) {
      return res.status(200).json({
        message: "Ticket deleted successfully",
      });
    }
  } catch (error) {
    console.log("ERROR DELETING TICKET:", error);
    return res.status(500).json({
      message: "Try again later",
    });
  }
};

export { GetTickets, CreateNewTicket, EditTicket, DeleteTicket };
