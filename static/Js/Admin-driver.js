document.getElementById("driverForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let userID = document.getElementById("userID").value;
  let driverID = document.getElementById("driverID").value;
  let email = document.getElementById("email").value;
  let first_name = document.getElementById("first_name").value;
  let last_name = document.getElementById("last_name").value;
  let date_of_birth = document.getElementById("date_of_birth").value;
  let gender = document.getElementById("gender").value;
  let phone = document.getElementById("phone").value;

  let tableBody = document.getElementById("driverTableBody");
  let row = tableBody.insertRow();
  
  row.insertCell(0).textContent = userID;
  row.insertCell(1).textContent = driverID;
  row.insertCell(2).textContent = email;
  row.insertCell(3).textContent = first_name;
  row.insertCell(4).textContent = last_name;
  row.insertCell(5).textContent = date_of_birth;
  row.insertCell(6).textContent = gender;
  row.insertCell(7).textContent = phone;

  this.reset();
});
