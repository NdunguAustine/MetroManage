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

document.getElementById('driver-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('driver-name').value;
    const contact = document.getElementById('driver-contact').value;
    const bus = document.getElementById('driver-bus').value;
    addOrUpdateDriver(name, contact, bus);
  });
  
  function addOrUpdateDriver(name, contact, bus) {
    const driverList = document.getElementById('driver-list').querySelector('tbody');
    let row = [...driverList.rows].find(row => row.cells[0].textContent === name);
    if (row) {
      row.cells[1].textContent = contact;
      row.cells[2].textContent = bus;
    } else {
      row = driverList.insertRow();
      row.innerHTML = `<td>${name}</td><td>${contact}</td><td>${bus}</td><td><button onclick="deleteDriver(this)">Delete</button></td>`;
    }
  }
  
  function deleteDriver(button) {
    button.closest('tr').remove();
  }
  