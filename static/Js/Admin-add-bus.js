document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addBusForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const busData = {
            busID: document.getElementById("busID").value.trim(),
            license_plate: document.getElementById("licensePlate").value.trim(),
            capacity: parseInt(document.getElementById("capacity").value),
            route: document.getElementById("route").value.trim(),
            status: document.getElementById("status").value
        };

        fetch("admin/addBus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()
            },
            body: JSON.stringify(busData)
        })
        .then(response => response.json())
        .then(data => {
            const message = data.message;
            const status = data.status;
            if (status === 200) {
                alert("Bus added successfully!");
                form.reset();
            } else {
                alert("Error: " + message);
            }
        })
        .catch(error => console.error("Error adding bus:", error));
    });

    function getCSRFToken() {
        return document.querySelector("[name=csrfmiddlewaretoken]").value;
    }
});
