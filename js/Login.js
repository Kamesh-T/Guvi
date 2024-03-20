

function setError(element, message){
    var formGroup = element.parentElement;
    var errorMsg = formGroup.querySelector('.error');
    errorMsg.innerText = message;
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
};

function setSuccess(element){
    var formGroup = element.parentElement;
    var errorMsg = formGroup.querySelector('.error');
    errorMsg.innerText = "";
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
};


//email validation
$("#email").on("change", ()=>{
    var email = document.getElementById("email");
    var regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailValue = email.value.trim();
    if(emailValue!=""){
        if(regx.test(emailValue)){
            setSuccess(email);
        }
        else{
            setError(email, "Please, Enter valid email address");
        }
    }
    else{
        setError(email, "Please, Enter email address");
    }
});

//password validation
var password = document.getElementById("password");
$("#password").on("change",()=>{
    var pswdValue = password.value.trim();
    if(pswdValue!=""){
        if(pswdValue.match(/[a-z]/g) && pswdValue.match(/[A-Z]/g) && pswdValue.match(/[0-9]/g) && pswdValue.match(/[^a-zA-Z\d]/g) && pswdValue.length>=8){
            setSuccess(password);
        }
        else{
            setError(password, "Please, Enter valid password");
        }
    }
    else{
        setError(password, "Please, Enter password");
    }
});


$("#form").on("submit", function(event){
    $.ajax({
        type: "POST",
        url: "/guvi/php/login.php",
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        },
        success: function(response){
           if(response==true){
                alert("User Validated Successfully");
                window.location.replace('/guvi/profile.html');
           }
           else{
                alert("Incorrect email or password");
           }
        },
        error: function(data){
            alert("Something went wrong, Try again!");
        }
    });
    event.preventDefault();
});

