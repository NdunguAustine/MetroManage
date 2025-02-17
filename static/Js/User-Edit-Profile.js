document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('edit-profile-form');
    const cancelBtn = document.getElementById('cancel-btn');

    // Handle form submission
    $("#edit-profile-form").submit(function(event){
        event.preventDefault();

        if(isVerified()){
            const formData = new FormData(this);
            fetch("/user/EditProfile",{
                method: 'POST',
                body: formData
            }).then(response=>{
                return response.json();
            }).then(data=>{
                const message = data.message;
                const status = data.status;
                alert("Message: "+message);
            }).catch(error=>{
                alert("Error: "+error.message);
                console.log("Error"+error);
            }).finally(()=>{
                //close modal dialog
                console.log("Finished!");
            });

        }else{
            alert("All field required!");
        }
    })

    function isVerified(){
        //verification
        return true;
    }
    // Handle cancel button click
    cancelBtn.addEventListener('click', function () {
        window.location.href = 'User-Profile-Page.html'; // Redirect to the profile view page
    });
});
