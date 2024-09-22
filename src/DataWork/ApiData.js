const APiData = async () => {
    try {
      const fetchdata = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await fetchdata.json();
      
      let tickets = data.tickets;
      const users = data.users;
  
      const allStatuses = ["Backlog","Todo", "In progress", "Done", "Canceled"]; 
      
      const existingStatuses = [...new Set(tickets.map(ticket => ticket.status))];
  
      const missingStatuses = allStatuses.filter(status => !existingStatuses.includes(status));
  
      missingStatuses.forEach(status => {
        tickets.push({
          id: ``,
          title: ``,
          userId: ``,
          priority: `-1`,
          status: status
        });
      });
  
      return { tickets, users };
    } catch (error) {
      console.error("Error fetching API data:", error);
      return { tickets: [], users: [] };  
    }
  };
  
  export default APiData;
  