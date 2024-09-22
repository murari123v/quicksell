import React, { useEffect, useState } from "react";
import "./Card.css";
import Avatar from "react-avatar";
const Card = ({ ticket, type ,userName}) => {
  const [tickets, setTickets] = useState([]);

  const getStatusImage = (status) => {
    switch (status) {
      case "Backlog":
        return require("../../assets/Backlog.svg").default;
      case "Todo":
        return require("../../assets/To-do.svg").default;
      case "In progress":
        return require("../../assets/in-progress.svg").default;
      default:
        return require("../../assets/No-priority.svg").default;
    }
  };


  return (
    <div className="card-container">
      <div key={ticket.id} className="ticket-card">
        <div className="ticket-header">
          <span className="ticket-id">{ticket.id}</span>
          {(type === "status" || type === "priority") && (
            // <img
            //   src={ticket.userAvatar || "default-avatar.png"} 
            //   alt="User Avatar"
            //   className="user-avatar"
            // />
            <Avatar
              name={userName}
              // src={userAvatarUrl}
              size="16"            
              round={true}         
              className="user-avatar"
            />
          )}
        </div>
        <div className="ticket-middle">
          {(type === "user" || type === "priority") && (
            <label className="ticket-label">
              <input type="checkbox" className="ticket-checkbox" />
              <span className="custom-checkbox"></span>
            </label>
          )}
          <h3 className="ticket-title">{ticket.title}</h3>
        </div>
        <div className="ticket-footer">
          {(type == "status" || type == "user") && (
            <div className="status-icon">
              <img
                src={getStatusImage(ticket.status)}
                alt={ticket.status}
                className="status-image"
              />
            </div>
          )}

          <span className="ticket-tag">
            <i className="icon-warning"></i> {ticket.tag || "No title"}
          </span>
        </div>
      </div>

    </div>
  );
};

export default Card;
