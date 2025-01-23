var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form");
  
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Retrieve form data
      const fullName = document.getElementById("full-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // Validate Input
      if (!fullName || !email || !phone || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Simulate Saving Data
      alert(`Profile updated successfully!\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}`);
      profileForm.reset(); // Clear form
    });
  });
  