$(document).ready(function() {

    $("#forgotButton").click(function() {
        console.log('ssssss')
        const email = $('#signinEmail').val();
        
        if(email.length<5 && !email.includes('@'))
        {
            alert("Enter valid Email")
            return;
        }

        console.log(email);

        const URL = `/user/password/resetlink/${email}`; 
        $.ajax({
            type: 'get',
            url: URL,
        })
        .done(function (data) {
            console.log(data);
            
        })
    
    })

});
