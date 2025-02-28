function confirmLogout() {
    // Redirect to Django logout URL
    window.location.href = "/user/ConfirmLogout";
}

function cancelLogout() {
    // Redirect back to the dashboard or previous page
    window.history.back();
}
