$(document).ready(function () {
    // Fetch existing routes and populate table on page load
    $("#route-form").submit(function (e) {
        e.preventDefault();
        const start = document.getElementById('route-start').value;
        const end = document.getElementById('route-end').value;
        const name = document.getElementById('route-name').value;
        
        const formData = new FormData(this);

        fetch("/admin/routes", {
            method: "POST",
            body: formData
        })
        .then(response => {
            
            if (!response.ok) {
                if(response.status == 402){
                    alert("Route already exists");
                }
                throw new Error("Server error! Please try again later.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const message = data.message;
            const status = data.status;
            
            window.location.reload()
            this.reset();

            // Update the table dynamically
            addOrUpdateRoute(data.route_id, start, end, name);
        })
        .catch(error => {
            console.error("Error:", error)
        }).finally(() => {
            // setTimeout(function(){
            //     $('#modal-loading').modal('hide');
            // }, 1000);
        });
    });

});

// Function to dynamically add or update a route in the table
function addOrUpdateRoute(routeID, start, end, stops) {
  const routeList = document.getElementById('route-list').querySelector('tbody');
  
  let row = [...routeList.rows].find(row => row.dataset.routeId === String(routeID));

  if (row) {
      // Update existing row
      row.cells[1].textContent = start;
      row.cells[2].textContent = end;
  } else {
      // Add new row
      row = routeList.insertRow();
      row.dataset.routeId = routeID;  // Store route ID in dataset for easy tracking

      row.innerHTML = `
          <td>${routeID}</td>
          <td>${start}</td>
          <td>${end}</td>
          <td>
              <button onclick="deleteRoute(${routeID}, this)">Delete</button>
          </td>
      `;
  }
}

// Function to delete a route from the table and database
// function deleteRoute(routeID, button) {
//   if (confirm("Are you sure you want to delete this route?")) {
//       fetch(`/admin/routes/${routeID}`, { method: "DELETE" })
//       .then(response => {
//           if (!response.ok) {
//               throw new Error("Error deleting route");
//           }
//           return response.json();
//       })
//       .then(data => {
//           alert(data.message);
//           button.closest('tr').remove();
//       })
//       .catch(error => console.error("Error:", error));
//   }
// }

// // Fetch existing routes and populate table on page load
// document.addEventListener("DOMContentLoaded", function () {
//   fetch("/admin/routes")
//       .then(response => response.json())
//       .then(data => {
//           data.routes.forEach(route => {
//               addOrUpdateRoute(route.id, route.start, route.end, route.stops);
//           });
//       })
//       .catch(error => console.error("Error fetching routes:", error));
// });
