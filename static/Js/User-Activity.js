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

// Sample Data for Logs
const logs = [
    { id: "L001", description: "Payment of SACCO fee", date: "2024-01-01", type: "payment" },
    { id: "L002", description: "Route updated for Bus 5", date: "2024-01-02", type: "route" },
    { id: "L003", description: "User logged in", date: "2024-01-03", type: "activity" },
    { id: "L004", description: "Stage fee payment", date: "2024-01-04", type: "payment" },
    { id: "L005", description: "Driver assigned to route 7", date: "2024-01-05", type: "activity" },
  ];
  
  // Populate Reports Table
  function populateReportsTable(filterType = "all", filterDate = "") {
    const tableBody = document.querySelector("#reports-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  
    const filteredLogs = logs.filter(log => {
      const matchesType = filterType === "all" || log.type === filterType;
      const matchesDate = !filterDate || log.date === filterDate;
      return matchesType && matchesDate;
    });
  
    filteredLogs.forEach(log => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${log.id}</td>
        <td>${log.description}</td>
        <td>${log.date}</td>
        <td>${log.type.charAt(0).toUpperCase() + log.type.slice(1)}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Handle Filter Button Click
  document.getElementById("filter-btn").addEventListener("click", () => {
    const filterType = document.getElementById("type-filter").value;
    const filterDate = document.getElementById("date-filter").value;
  
    populateReportsTable(filterType, filterDate);
  });
  
  // Initial Table Population
  populateReportsTable();
  