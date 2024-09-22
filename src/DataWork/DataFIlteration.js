const FilterByUser = (tickets)=>{
   const myMap = new Map();

   for(let i=0; i<tickets.length; i++){
        const userId = tickets[i].userId;

        if (!myMap.has(userId)) {
            myMap.set(userId, []);  
        }
        myMap.get(userId).push(tickets[i]);
   }

  return myMap;
}  



const FilterByPriority = (tickets) => {
    const myMap = new Map();
    for(let i=0; i<tickets.length; i++){
        const priority = tickets[i].priority;

        if (!myMap.has(priority)) {
            myMap.set(priority, []);  
        }
        myMap.get(priority).push(tickets[i]);
   }

  return myMap;
}

const FilterByStatus = ( tickets )=>{
    const myMap = new Map();

   for(let i=0; i<tickets.length; i++){
        const status = tickets[i].status;

        if (!myMap.has(status)) {
            myMap.set(status, []);  
        }
        myMap.get(status).push(tickets[i]);
   }

  return myMap;
}


// only for demo check

// const ticke = [{
//     "id": "CAM-1",
//     "title": "Update User Profile Page UI",
//     "tag": [
//       "Feature request"
//     ],
//     "userId": "usr-1",
//     "status": "Todo",
//     "priority": 4
//   },
//   {
//     "id": "CAM-2",
//     "title": "Add Multi-Language Support - Enable multi-language support within the application.",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-2",
//     "status": "In progress",
//     "priority": 3
//   },
//   {
//     "id": "CAM-3",
//     "title": "Optimize Database Queries for Performance",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-2",
//     "status": "In progress",
//     "priority": 1
//   },
//   {
//     "id": "CAM-4",
//     "title": "Implement Email Notification System",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-1",
//     "status": "In progress",
//     "priority": 3
//   },
//   {
//     "id": "CAM-5",
//     "title": "Enhance Search Functionality",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-5",
//     "status": "In progress",
//     "priority": 0
//   },
//   {
//     "id": "CAM-6",
//     "title": "Third-Party Payment Gateway",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-2",
//     "status": "Todo",
//     "priority": 1
//   },
//   {
//     "id": "CAM-7",
//     "title": "Create Onboarding Tutorial for New Users",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-1",
//     "status": "Backlog",
//     "priority": 2
//   },
//   {
//     "id": "CAM-8",
//     "title": "Implement Role-Based Access Control (RBAC)",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-3",
//     "status": "In progress",
//     "priority": 3
//   },
//   {
//     "id": "CAM-9",
//     "title": "Upgrade Server Infrastructure",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-5",
//     "status": "Todo",
//     "priority": 2
//   },
//   {
//     "id": "CAM-10",
//     "title": "Conduct Security Vulnerability Assessment",
//     "tag": [
//       "Feature Request"
//     ],
//     "userId": "usr-4",
//     "status": "Backlog",
//     "priority": 1
//   }];

//   const checkig = ()=>{
//     // const rmap = FilterByUser(ticke);
//     // const rmap = FilterByStatus(ticke);
//     const rmap = FilterByPriority(ticke);

//     for (const [key, value] of rmap) {
//         console.log(`${key} = ${value.map(v => v.title)}`);
//       }

//   }

//   checkig();