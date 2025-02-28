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

function toggleDropdown() {
    let dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-icon')) {
        let dropdown = document.getElementById("profileDropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
};

