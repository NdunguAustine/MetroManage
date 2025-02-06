document.addEventListener("DOMContentLoaded", function () {
    console.log("Driver List Page Loaded");

    // Handle Pagination Clicks
    document.querySelectorAll(".pagination a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            fetchPage(this.getAttribute("href"));
        });
    });
});

/**
 * Fetches driver data for the specified page and updates the table dynamically.
 * @param {string} url - The pagination URL.
 */
function fetchPage(url) {
    fetch(url, {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    })
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Update table body
        const newTableBody = doc.querySelector("tbody").innerHTML;
        document.querySelector("tbody").innerHTML = newTableBody;

        // Update pagination controls
        const newPagination = doc.querySelector(".pagination").innerHTML;
        document.querySelector(".pagination").innerHTML = newPagination;

        // Re-attach event listeners to new pagination links
        document.querySelectorAll(".pagination a").forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                fetchPage(this.getAttribute("href"));
            });
        });

        console.log("Page updated successfully");
    })
    .catch(error => console.error("Error fetching page:", error));
}
