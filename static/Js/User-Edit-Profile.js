document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('edit-profile-form');
    const cancelBtn = document.getElementById('cancel-btn');

    // Load existing user data (this would typically come from a server)
    const userData = {
        driverID: 'D12345',
        email: 'user@example.com',
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        phone: '+1234567890'
    };

    // Populate form fields with existing data
    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            const input = form.elements[key];
            if (input) {
                input.value = userData[key];
            }
        }
    }

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const updatedData = {};
        for (const element of form.elements) {
            if (element.name) {
                updatedData[element.name] = element.value;
            }
        }
        // Here you can send updatedData to the server using fetch() or another method
        console.log('Updated User Data:', updatedData);
        alert('Profile updated successfully!');
        // Redirect or update the UI as needed
    });

    // Handle cancel button click
    cancelBtn.addEventListener('click', function () {
        window.location.href = 'profile.html'; // Redirect to the profile view page
    });
});
