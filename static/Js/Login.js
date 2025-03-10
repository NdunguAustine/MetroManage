document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const login_btn = $("#login-btn");
    const spinner_html = `<i class="fa-solid fa-spinner fa-spin" style="color: #ff5900;"></i>`;
    login_btn.html(spinner_html);
    login_btn.attr("disabled", "disabled");

    const formData = new FormData(this);
    const response = await fetch("/auth/login", {
        method: "POST",
        body: formData,
    }).then(response=>{
        return response.json();
    }).then(data=>{
        const message = data.message;
        const status =data.status;
        if(status == 200 || status == 201){
            const redirect_url = data.redirect_url;
            window.location.href = redirect_url;
        }
    }).catch(error=>{
        console.error("Error: ",error);
    }).finally(()=>{
        login_btn.html("Login");
        login_btn.attr("disabled", false);
    });
});