$(document).ready(function () {
    $("#addBusForm").submit( function(event) {
        event.preventDefault(); // Prevent form from reloading the page
        const formData = new FormData(this);
        
        fetch("/admin/addBus", {
            method: "POST",
            headers: {
                "X-CSRFToken": getCSRFToken()
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const message = data.message;
            const status = data.status;
            if (status === 200) {
                alert("Bus added successfully!");
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
