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

document.getElementById('bus-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const reg = document.getElementById('bus-reg').value;
    const status = document.getElementById('bus-status').value;
    addOrUpdateBus(reg, status);
  });
  
  function addOrUpdateBus(reg, status) {
    const busList = document.getElementById('bus-list').querySelector('tbody');
    let row = [...busList.rows].find(row => row.cells[0].textContent === reg);
    if (row) {
      row.cells[1].textContent = status;
    } else {
      row = busList.insertRow();
      row.innerHTML = `<td>${reg}</td><td>${status}</td><td><button onclick="deleteBus(this)">Delete</button></td>`;
    }
  }
  
  function deleteBus(button) {
    button.closest('tr').remove();
  }
  