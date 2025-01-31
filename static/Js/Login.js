document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from refreshing the page

        // Get form values
        const role = document.getElementById("role").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Simple validation
        if (email.trim() === "" || password.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Simulated authentication
        if (role === "admin") {
            window.location.href = "admin-dashboard.html"; // Redirect to Admin Dashboard
        } else {
            window.location.href = "user-dashboard.html"; // Redirect to User Dashboard
        }
    });
});
