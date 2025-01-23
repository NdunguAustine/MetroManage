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

document.addEventListener("DOMContentLoaded", () => {
    const addPaymentBtn = document.getElementById("add-payment-btn");
    const paymentModal = document.getElementById("payment-modal");
    const closeModal = document.getElementById("close-modal");
    const paymentForm = document.getElementById("payment-form");
    const paymentsTableBody = document.querySelector("#payments-table tbody");
  
    // Open Modal
    addPaymentBtn.addEventListener("click", () => {
      paymentModal.classList.remove("hidden");
    });
  
    // Close Modal
    closeModal.addEventListener("click", () => {
      paymentModal.classList.add("hidden");
    });
  
    // Add Payment (Simulated)
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const driverName = document.getElementById("driver-name").value;
      const busId = document.getElementById("bus-id").value;
      const amount = document.getElementById("amount").value;
      const paymentMethod = document.getElementById("payment-method").value;
  
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${Math.floor(Math.random() * 10000)}</td>
        <td>${driverName}</td>
        <td>${busId}</td>
        <td>Ksh ${amount}</td>
        <td>${new Date().toLocaleString()}</td>
        <td>${paymentMethod}</td>
        <td>Successful</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;
  
      paymentsTableBody.appendChild(newRow);
      paymentModal.classList.add("hidden");
      paymentForm.reset();
    });
  });
  