
$(document).ready(function() {


    let OTP;
    // sending OTP    
    $('#otpSend').click(function(e){
        
        const name = $('#userName').val();
        const email = $('#userEmail').val();

        // email is not valid
        if(email.length<5 && !email.includes('@'))
        {
            alert("Enter valid Email")
                return;
        }
        // url of req
        const URL = `/user/otp/?email=${email}&name=${name}`; 
        $.ajax({
            type: 'get',
            url: URL,
        })
        .done(function (data) {
            OTP = data.otp; // storing OTP

            // showing otp box
            $('#otpBox').removeClass('hide');
            $('#otpSend').html('Sent');
            $('#otpSend').addClass('disabled');

            // to set time on OTP
            validTime();

        })
    })
    
    // Executed when any AJAX request starts
    $(document).ajaxStart(function() {
        $('#otpSend').html('OTP sending');

    });

        // checking user OTP
    $('#otpVerify').click(function(){

            const userOTP = $('#otpUser').val();
            // otp is wrong

            if(userOTP.toString() !== OTP.toString())
            {
                $('#otpMsg').html('OTP mismatch. Try again');
                $('#otpSend').removeClass('disabled');
                $('#otpSend').html('Send Again');
                $('#otpUser').val('');
            }else
            {
                // if otp is correct

                otpVerified();
                
            }
    })


    function otpVerified()
    {
        
        // correcting email
        $('#otpSend').addClass('hide');
        $('#emailBox').addClass('col-12 ');
        $('#userEmail').addClass('border');

        
        $('#otpBox').addClass('hide');

        $('#otpSendBox').addClass('hide');
        $('#Signupbtn').removeClass('disabled btn-dark');
        $('#Signupbtn').addClass('btn-success');
        
    }

    function validTime()
    {
        $('#otpMsg').html('OTP sent to your email');
        let remainingTime = 60 // Start with 60 seconds

        // Display initial value of 60
        const intervalId = setInterval(function() {
            $('#otpMsg').html(`OTP expire in ${remainingTime} seconds`); // Update the #otpMsg element with the remaining time
            remainingTime--; // Decrement remaining time

            // Check if the countdown has reached 0, then stop the interval
            if (remainingTime === 0) {
                clearInterval(intervalId);
                // Optionally, you can reset the message to its initial value after the countdown ends
                $('#otpMsg').html('OTP expired. Try Again');
                $('#otpSend').removeClass('disabled btn-danger');
                $('#otpSend').addClass('btn-outline-success');
                $('#otpSend').html('Get new OTP');
                // $('#otpBox').addClass('hide');
                OTP = 0;
            }
        }, 1000);

    }

});

