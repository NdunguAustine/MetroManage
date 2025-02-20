document.getElementById('routeUpdateForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const newRoute = document.getElementById('newRoute').value.trim();
  const reason = document.getElementById('reason').value.trim();
  console.log(newRoute, reason);

  if (!newRoute || !reason) {
      alert("Please fill in all fields.");
      return;
  }
  const formData = new FormData(this);

  fetch("/user/routes",{
      method:"POST",
      body:formData,
      headers:{
          "Content-Type":"application/json",
          "X-CSRFToken": $("input[name='csrfmiddlewaretoken']").val(),
      },
  })
  .then(response=>response.json())
  .then(data=>{
    const message = data.message;
    const status = data.status;
      if(data.status===200){
          alert("Request submitted successfully!");
      }else{
          alert(message);
      }
  });
  // Create request data
  const requestData = {
      route: newRoute,
      reason: reason,
      status: "Pending"
  };

  // Add to pending requests table
  addPendingRequest(requestData);

  // Clear form
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
