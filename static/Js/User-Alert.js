

// Sample Notifications Data
const notifications = [
    { id: 1, message: "Your payment has been successfully processed.", time: "2024-12-27 10:00 AM" },
    { id: 2, message: "New route updates are available for your preferred destination.", time: "2024-12-26 2:30 PM" },
    { id: 3, message: "SACCO fee payment is due tomorrow.", time: "2024-12-26 9:00 AM" },
    { id: 4, message: "Maintenance scheduled for Bus #5.", time: "2024-12-25 5:00 PM" },
  ];
  
  // Populate Notifications
  function populateNotifications() {
    const notificationsList = document.getElementById("notifications-list");
  
    // Clear existing notifications
    notificationsList.innerHTML = "";
  
    // Create notification cards
    notifications.forEach(notification => {
      const notificationCard = document.createElement("div");
      notificationCard.className = "notification-card";
  
      notificationCard.innerHTML = `
        <div class="message">${notification.message}</div>
        <div class="time">${notification.time}</div>
        <button class="close-btn" data-id="${notification.id}">&times;</button>
      `;
  
      notificationsList.appendChild(notificationCard);
    });
  
    // Attach event listeners for close buttons
    document.querySelectorAll(".close-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const notificationId = parseInt(e.target.getAttribute("data-id"));
        removeNotification(notificationId);
      });
    });
  }
  
  // Remove Notification
  function removeNotification(id) {
    const index = notifications.findIndex(notification => notification.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
      populateNotifications();
    }
  }
  
  // Initialize Notifications on Page Load
  document.addEventListener("DOMContentLoaded", () => {
    populateNotifications();
  });
  