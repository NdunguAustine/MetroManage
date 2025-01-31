

// JavaScript for Reports Module
document.getElementById('filter-button').addEventListener('click', () => {
    const filterValue = document.getElementById('report-filter').value.toLowerCase();
    const tableRows = document.querySelectorAll('#reports-table tbody tr');
  
    tableRows.forEach(row => {
      const reportType = row.cells[2].textContent.toLowerCase();
  
      if (filterValue === 'all' || reportType === filterValue) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
  