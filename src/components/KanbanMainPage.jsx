import React, { useState, useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import Card from './Card/Card';
import APiData from '../DataWork/ApiData';
import './KanbanMainPage.css';
import addImg from '../assets/add.svg';
import threedot from '../assets/3 dot menu.svg';
import Avatar from 'react-avatar';

const FilterByUser = (tickets) => {
  const myMap = new Map();

  tickets.forEach(ticket => {
    const userId = ticket.userId;

    if (!userId) return;

    if (!myMap.has(userId)) {
      myMap.set(userId, []);
    }

    myMap.get(userId).push(ticket);
  });

  return myMap;
};


const FilterByPriority = (tickets) => {
  const myMap = new Map();
  tickets.forEach(ticket => {
    const priority = ticket.priority;
    if (priority == -1) return;
    if (!myMap.has(priority)) {

      myMap.set(priority, []);
    }
    myMap.get(priority).push(ticket);
  });
  return myMap;
};

const FilterByStatus = (tickets) => {
  const myMap = new Map();
  tickets.forEach(ticket => {
    const status = ticket.status;
    if (!myMap.has(status)) {
      myMap.set(status, []);
    }
    myMap.get(status).push(ticket);
  });
  return myMap;
};

const KanbanMainPage = () => {
  const [filterType, setFilterType] = useState(() => {
    return localStorage.getItem('filterType') || 'status';
  });
  const [sortType, setSortType] = useState(() => {
    return localStorage.getItem('sortType') || 'priority'; 
  });
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { tickets, users } = await APiData();
        setTickets(tickets); 
        setUsers(users);      
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    localStorage.setItem('filterType', filterType);
    localStorage.setItem('sortType', sortType);
  }, [filterType, sortType]);

  useEffect(() => {
    if (tickets.length > 0) {
      applyFilters();
    }
  }, [filterType, sortType, tickets]);

  const getPriority = (status) => {
    switch (status) {
      case 0:
        return "No priority";
      case 1:
        return "Low";
      case 2:
        return "Medium"
      case 3:
        return "High";
      case 4:
        return "Urgent"
      default:
        return "NA";
    }
  };
  const getStatusImage = (status) => {
    switch (status) {
      case "Backlog":
        return require("../assets/Backlog.svg").default;
      case "Todo":
        return require("../assets/To-do.svg").default;
      case "In progress":
        return require("../assets/in-progress.svg").default;
      case "Done":
        return require("../assets/Done.svg").default;
      case "Low":
        return require("../assets/Img - Low Priority.svg").default;
      case "Medium":
        return require("../assets/Img - Medium Priority.svg").default;
      case "Canceled":
        return require("../assets/Cancelled.svg").default;
      case "High":
        return require("../assets/Img - High Priority.svg").default;
      case "Urgent":
        return require("../assets/SVG - Urgent Priority colour.svg").default;
      default:
        return require("../assets/No-priority.svg").default;
    }
  };
  const applyFilters = () => {
    let groupedTickets;

    switch (filterType) {
      case 'status':
        groupedTickets = FilterByStatus(tickets);
        break;
      case 'user':
        groupedTickets = FilterByUser(tickets);
        break;
      case 'priority':
        groupedTickets = FilterByPriority(tickets);
        break;
      default:
        groupedTickets = new Map();
    }

    const ticketArray = Array.from(groupedTickets, ([key, value]) => ({
      key,
      items: sortTickets(value, sortType).filter(ticket => ticket.title && ticket.id),
    }));

    setFilteredTickets(ticketArray);
  };

  const sortTickets = (tickets, sortType) => {
    return tickets.sort((a, b) => {
      if (sortType === 'priority') {
        return b.priority - a.priority;
      } else if (sortType === 'title') {
        return a.title.localeCompare(b.title); 
      }
      return 0;
    });
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="kanban-board">
      <NavBar
        setFilterType={setFilterType}
        setSortType={setSortType}
        filterType={filterType}
        sortType={sortType}
      />

      <div className="kanban-columns">
        {filteredTickets.map(group => (
          <div key={group.key} className="kanban-column">
            {filterType === "user" && (
              <div>
                <div style={{ display: "flex", padding: "0 20px", justifyContent: "space-between" }}>
                  <div style={{ display: "flex" }}>
                    <Avatar
                      name={getUserName(group.key)}
                      size="20"
                      round={true}
                      className="user-avatar"
                    />
                    <span>{getUserName(group.key)}</span>
                    <span style={{ paddingLeft: "15px" }}>{group.items.length}</span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src={addImg} alt="" />
                    <img src={threedot} alt="" />
                  </div>
                </div>
              </div>
            )}
            {filterType === "status" && (
              <div>
                <div style={{ display: "flex", padding: "0 20px", justifyContent: "space-between" }}>
                  <div>
                    <img src={getStatusImage(group.key)} className="user-avatar" alt="status" />
                    <span>{group.key}</span>
                    <span style={{ paddingLeft: "8px" }}>{group.items.length}</span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src={addImg} alt="" />
                    <img src={threedot} alt="" />
                  </div>
                </div>
              </div>
            )}
            {filterType === "priority" && (
              <div>
                <div style={{ display: "flex", padding: "0 20px", justifyContent: "space-between" }}>
                  <div>
                    <img src={getStatusImage(getPriority(group.key))} className="user-avatar" alt="status" />

                    <span>{getPriority(group.key)}</span>
                    <span style={{ paddingLeft: "8px" }}>{group.items.length}</span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src={addImg} alt="" />
                    <img src={threedot} alt="" />
                  </div>
                </div>
              </div>
            )}
            {group.items.map(ticket => (
              <Card
                key={ticket.id}
                ticket={ticket}
                type={filterType}
                userName={getUserName(ticket.userId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanMainPage;
