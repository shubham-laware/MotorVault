import React, { useEffect, useRef, useState } from "react";
import "../css/tickets.css";
import "../css/ticket-modal.css";
import { toast } from "react-toastify";
import axios from "axios";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  const [isEditTicketMode, setIsEditTicketMode] = useState(false);

  const [originalTicket, setOriginalTicket] = useState({});

  const [ticketToDelete, setTicketToDelete] = useState("");

  const fetchTickets = async () => {
    try {
      const response = await axios.get("https://motorvault.onrender.com/api/v1/tickets");

      if (response.status === 200) {
        const data = response.data.tickets;
        setTickets(data);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const [ticket, setTicket] = useState({
    ticketID: "",
    assetID: "",
    issue: "",
    dateRaised: "",
    status: "Open",
  });

  const clearInputFields = () => {
    setTicket({
      ticketID: "",
      assetID: "",
      issue: "",
      dateRaised: "",
      status: "Open",
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const modalRef = useRef(null);
  const deleteModalRef = useRef(null);

  const openModal = (ticketToEdit) => {
    setIsOpen(true);

    if (ticketToEdit !== null) {
      setIsEditTicketMode(true);
      setTicket(ticketToEdit);
      setOriginalTicket(ticketToEdit);
    }
    document.body.classList.add("modal-open");
  };

  const openDeleteModal = (ticketID) => {
    setTicketToDelete(ticketID);
    setIsDeleteModalOpen(true);
    document.body.classList.add("deleteModal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    clearInputFields();
    setIsEditTicketMode(false);
    document.body.classList.remove("modal-open");
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    document.body.classList.remove("deleteModal-open");
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }

    if (
      deleteModalRef.current &&
      !deleteModalRef.current.contains(event.target)
    ) {
      closeDeleteModal();
      return;
    }
  };

  const handleTicketInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const validateInputFields = (ticket) => {
    for (const inputField in ticket) {
      if (ticket[inputField] === "") {
        toast.warning(`${inputField}  is required`, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }

      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

      if (
        inputField === "dateRaised" &&
        !datePattern.test(ticket[inputField])
      ) {
        toast.warning(`${inputField} must be in the format dd/mm/yyyy`, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
    }

    return true;
  };

  const handleCreateNewTicket = async () => {
    const validated = validateInputFields(ticket);

    if (validated) {
      try {
        const response = await axios.post(
          "https://motorvault.onrender.com/api/v1/new-ticket",
          ticket
        );
        if (response.status === 201) {
          toast.success(response.data.message, {
            autoClose: 1000,
            hideProgressBar: true,
          });
          closeModal();
          fetchTickets();
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleEditChanges = async () => {
    const validated = validateInputFields(ticket);

    const updatedFields = Object.entries(ticket)
      .filter(([key, value]) => value !== originalTicket[key])
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});


    if (Object.keys(updatedFields).length === 0) {
      closeModal();
      toast.warning("No fields updated", {
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    if (validated) {
      try {
        const response = await axios.post(
          `https://motorvault.onrender.com/api/v1/edit-ticket/${ticket.ticketID}`,
          updatedFields
        );
        if (response.status === 200) {
          toast.success(response.data.message, {
            autoClose: 1000,
            hideProgressBar: true,
          });
          closeModal();
          fetchTickets();
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleDeleteTicket = async () => {
    try {
      const response = await axios.post(
        "https://motorvault.onrender.com/api/v1/delete-ticket",
        { ticketToDelete }
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        closeDeleteModal();
        fetchTickets();
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000,
        hideProgressBar: true,
      });
      closeDeleteModal();
    }
  };

  return (
    <div className="c-layout">
      <div className="c-nav">
        <h3>TICKETS</h3>
      </div>
      <div className="c-content">
        <div className="add-ticket-btn-layout">
          <button className="add-ticket-btn" onClick={() => openModal(null)}>
            Add Ticket
          </button>
        </div>

        <div className="tickets-layout">
          <table>
            <thead>
              <tr>
                <th className="ticket-id">Ticket ID</th>
                <th className="tk-asset-id">Asset ID</th>
                <th className="issue">Issue</th>
                <th className="raised">Raised</th>
                <th className="status">Status</th>
                <th className="actions"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index} className="ticket">
                  <td className="ticket-id">{ticket.ticketID}</td>
                  <td className="tk-asset-id">{ticket.assetID}</td>
                  <td className="issue">{ticket.issue}</td>
                  <td className="raised">{ticket.dateRaised}</td>
                  <td className="status">{ticket.status}</td>
                  <td className="actions">
                    <div>
                      <img
                        src="/edit.svg"
                        alt="Edit"
                        className="options-svg"
                        onClick={() => openModal(ticket)}
                      />
                      <img
                        src="/delete.svg"
                        alt="delete"
                        className="options-svg"
                        onClick={() => openDeleteModal(ticket.ticketID)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}

          
         <div className="mobile-ticket-container">
         {tickets.map((ticket, index) => (
            <div key={index} className="ticket-card">
              <div className="mobile-items">
                <div className="mobile-title"><span>Ticket ID</span> <span>:</span>  </div>
                <span className="mobile-value">{ticket.ticketID}</span>
              </div>

              <div className="mobile-items">
                <div className="mobile-title"><span>Asset ID</span> <span>:</span> </div>
                <span  className="mobile-value">{ticket.assetID}</span>
              </div>

              <div className="mobile-items">
                <div className="mobile-title"><span>Raised</span> <span>:</span> </div>
                <span className="mobile-value">{ticket.dateRaised}</span>
              </div>

              <div className="mobile-items">
                <div className="mobile-title"><span>Status</span> <span>:</span></div>
                <span  className="mobile-value">{ticket.status}</span>
              </div>

              <div className="mobile-items mobile-issue">
                <div className="mobile-title"><span>Issue</span> <span>:</span></div>
                <span  className="mobile-value">{ticket.issue}</span>
              </div>

              <div className="mobile-actions">
                <img
                  src="/edit.svg"
                  alt="Edit"
                  className="options-svg"
                  onClick={() => openModal(ticket)}
                />
                <img
                  src="/delete.svg"
                  alt="delete"
                  className="options-svg"
                  onClick={() => openDeleteModal(ticket.ticketID)}
                />
              </div>
            </div>
          ))}
         </div>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  {isEditTicketMode ? "Edit Ticket" : "New Ticket"}
                </h2>
                <button className="modal-close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="ticket-modal-inline">
                    <input
                      type="text"
                      placeholder="Ticket-ID"
                      className="ticket-modal ticket-modal-inline-item"
                      name="ticketID"
                      value={ticket.ticketID}
                      readOnly={isEditTicketMode}
                      onChange={handleTicketInputChange}
                    />
                    <input
                      type="text"
                      placeholder="Asset-ID"
                      className="ticket-modal ticket-modal-inline-item"
                      name="assetID"
                      value={ticket.assetID}
                      onChange={handleTicketInputChange}
                    />
                  </div>
                  <textarea
                    placeholder="Issue Description"
                    className="ticket-modal ticket-modal-description"
                    name="issue"
                    value={ticket.issue}
                    onChange={handleTicketInputChange}
                  ></textarea>
                  <div className="ticket-modal-inline">
                    <input
                      type="text"
                      placeholder="Date Raised (dd/mm/yyyy)"
                      className="ticket-modal ticket-modal-inline-item"
                      name="dateRaised"
                      value={ticket.dateRaised}
                      onChange={handleTicketInputChange}
                    />
                    <select
                      className="ticket-modal ticket-modal-inline-item ticket-modal-status"
                      name="status"
                      value={ticket.status}
                      onChange={handleTicketInputChange}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                {isEditTicketMode ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditChanges}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreateNewTicket}
                  >
                    Add Ticket
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Ticket Modal */}

      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal" ref={deleteModalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title"></h2>{" "}
                <button className="modal-close" onClick={closeDeleteModal}>
                  &times;
                </button>
              </div>
              <h2
                className="modal-body"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Are you sure ?
              </h2>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDeleteTicket}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tickets;
