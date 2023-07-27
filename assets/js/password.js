$(document).ready(function() {
    $("#update").click(function() {
        // Get the values from the input fields
        const currPassword = $("#currPassword").val();
        const newPassword = $("#newPassword").val();
        const confirmPassword = $("#confirmPassword").val();
        
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            $("#currPassword").val(""); // Clear the values
            $("#newPassword").val("");
            $("#confirmPassword").val("");
            return; // Exit the click handler if passwords don't match
        }

        // Now you can use these values as needed
        console.log("Current Password:", currPassword);
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
        
        const isValid = otpVerify();

    
    });


    function otpVerify()
    {
        const otpInputs = $(".opt-input");

        otpInputs.on("input", function() {
          const $this = $(this);
          if ($this.val().length >= this.maxLength) {
            // Move the focus to the next input box if the current box is filled
            const currentIndex = otpInputs.index(this);
            if (currentIndex < otpInputs.length - 1) {
              otpInputs.eq(currentIndex + 1).focus();
            }
          }
        });        
    }
});
