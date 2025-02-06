

document.getElementById('route-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const start = document.getElementById('route-start').value;
    const end = document.getElementById('route-end').value;
    const stops = document.getElementById('route-stops').value;

    const formData = new FormData(this);

    fetch("/admin/routes",{
      method: "POST",
      body: formData
    }).then(response=>{
      if(!response.ok){
        throw new Error("Server error");
      }
      return response.json()
    }).then(data=>{
      console.log(data);

      const message = data.message;
      const status = data.status;
      alert(message);

      this.reset();
      addOrUpdateRoute(start, end, stops);
  });
});
  function addOrUpdateRoute(start, end, stops) {
    const routeList = document.getElementById('route-list').querySelector('tbody');
    let row = [...routeList.rows].find(row => row.cells[0].textContent === start && row.cells[1].textContent === end);
    if (row) {
      row.cells[2].textContent = stops;
    } else {
      row = routeList.insertRow();
      row.innerHTML = `<td>${start}</td><td>${end}</td><td>${stops}</td><td><button onclick="deleteRoute(this)">Delete</button></td>`;
    }
  }
  
  function deleteRoute(button) {
    button.closest('tr').remove();
  }
  