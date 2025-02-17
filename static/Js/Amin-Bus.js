document.addEventListener("DOMContentLoaded", function () {
  const busTableBody = document.getElementById("busTableBody");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  let currentPage = 1;
  const rowsPerPage = 5;

    // Fetch Bus Data
    

  // Render table rows dynamically
  function renderTable(buses) {
      busTableBody.innerHTML = "";
      buses.forEach(bus => {
          const row = `
              <tr>
                  <td>${bus.busID}</td>
                  <td>${bus.license_plate}</td>
                  <td>${bus.capacity}</td>
                  <td>${bus.route}</td>
                  <td>${bus.status}</td>
              </tr>
          `;
          busTableBody.innerHTML += row;
      });
  }

  // Update pagination buttons
  function updatePagination(prev, next) {
      prevBtn.disabled = !prev;
      nextBtn.disabled = !next;
  }

  // Event Listeners for Pagination
  prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
          currentPage--;
          //fetchBusData();
      }
  });

  nextBtn.addEventListener("click", () => {
      currentPage++;
      //fetchBusData();
  });

  // Initial Fetch
  //fetchBusData();
});
