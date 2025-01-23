var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// Dynamic Route Data
const routes = [
    { id: "R001", start: "City Center", destination: "Airport", departure: "08:00 AM", arrival: "09:30 AM", status: "On Time" },
    { id: "R002", start: "East Station", destination: "West Park", departure: "09:00 AM", arrival: "10:15 AM", status: "Delayed" },
    { id: "R003", start: "North Gate", destination: "South Terminal", departure: "10:30 AM", arrival: "12:00 PM", status: "On Time" },
  ];
  
  // Populate Table Function
  function populateRouteTable() {
    const tableBody = document.querySelector("#route-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  
    routes.forEach(route => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${route.id}</td>
        <td>${route.start}</td>
        <td>${route.destination}</td>
        <td>${route.departure}</td>
        <td>${route.arrival}</td>
        <td>${route.status}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Refresh Button Click Event
  document.getElementById("refresh-btn").addEventListener("click", () => {
    populateRouteTable();
    alert("Routes have been refreshed!");
  });
  
  // Initial Table Population
  populateRouteTable();
  