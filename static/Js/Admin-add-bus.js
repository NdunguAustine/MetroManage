document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addBusForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const formData = new FormData(this);
        
        console.log("form data",formData)

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
