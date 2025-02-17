document.getElementById('routeUpdateForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const newRoute = document.getElementById('newRoute').value.trim();
  const reason = document.getElementById('reason').value.trim();

  if (!newRoute || !reason) {
      alert("Please fill in all fields.");
      return;
  }

  // Create request data
  const requestData = {
      route: newRoute,
      reason: reason,
      status: "Pending"
  };

  // Add to pending requests table
  addPendingRequest(requestData);

  // Clear form
  this.reset();
});

function addPendingRequest(request) {
  const tableBody = document.getElementById('pendingRequests');
  const row = document.createElement('tr');

  row.innerHTML = `
      <td>${request.route}</td>
      <td>${request.reason}</td>
      <td>${request.status}</td>
  `;

  tableBody.appendChild(row);
}
