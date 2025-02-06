document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    

    const formData = new FormData(this);
    const response = await fetch("/auth/login", {
        method: "POST",
        body: formData,
    }).then(response=>{
        return response.json();
    }).then(data=>{
        const message = data.message;
        const status =data.status;
        alert(message)
    }).catch(error=>{
        console.error("Error: ",error);
    });
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let loginButton = document.getElementById("loginButton");
    let loadingIndicator = document.getElementById("loadingIndicator");

    loginButton.disabled = true;
    loadingIndicator.style.display = "inline-block";

    let formData = new FormData(this);

    fetch("/login/", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);  // Display message to user
        if (data.status === 200) {
            window.location.href = "/dashboard/";  // Redirect on success
        }
    })
    .catch(error => console.error("Error:", error))
    .finally(() => {
        loginButton.disabled = false;
        loadingIndicator.style.display = "none";
    });
});
