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
