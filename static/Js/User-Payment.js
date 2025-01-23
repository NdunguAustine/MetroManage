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

// Dynamic Payment Data
const payments = [
    { id: "P001", type: "SACCO Fee", amount: "500", status: "Paid" },
    { id: "P002", type: "Stage Fee", amount: "300", status: "Pending" },
  ];
  
  // Populate Payment Table
  function populatePaymentTable() {
    const tableBody = document.querySelector("#payment-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows
  
    payments.forEach(payment => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payment.id}</td>
        <td>${payment.type}</td>
        <td>${payment.amount}</td>
        <td>${payment.status}</td>
        <td>${payment.status === "Pending" ? '<button class="pay-now-btn">Pay Now</button>' : '—'}</td>
      `;
      tableBody.appendChild(row);
    });
  
    attachPayNowHandlers();
  }
  
  // Handle Pay Now Button Clicks
  function attachPayNowHandlers() {
    document.querySelectorAll(".pay-now-btn").forEach(button => {
      button.addEventListener("click", () => {
        alert("Redirecting to payment gateway...");
      });
    });
  }
  
  // Handle Payment Form Submission
  document.getElementById("pay-btn").addEventListener("click", () => {
    const feeType = document.getElementById("fee-type").value;
    const amount = document.getElementById("amount").value;
  
    if (!amount) {
      alert("Please enter a valid amount.");
      return;
    }
  
    payments.push({ id: `P00${payments.length + 1}`, type: feeType, amount, status: "Paid" });
    populatePaymentTable();
    alert("Payment successful!");
  });
  
  // Initial Table Population
  populatePaymentTable();
  