
const form = document.getElementById("form");
form.addEventListener("submit", function(event){
    event.preventDefault()
});


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


var isNameValid = false;
var isEmailValid = false;
var isPswdValid = false;

//name validation
$("#name").on("change", ()=>{
    var name = document.getElementById("name");
    var nameValue = name.value.trim();
    var letters = /^[A-Za-z\s]*$/;
    if(nameValue.length >= 3 && nameValue!="" && nameValue.match(letters)){
        isNameValid = true;
        setSuccess(name);
    }
    else{
        setError(name, "Please, Enter valid name");
    }
});


//email validation
$("#email").on("change", ()=>{
    var email = document.getElementById("email");
    var regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailValue = email.value.trim();
    if(emailValue!=""){
        if(regx.test(emailValue)){
            isEmailValid = true;
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

//confirm validation
$("#cpassword").on("change",()=>{
    var cpassword = document.getElementById("cpassword");
    var pswdValue = document.getElementById("password").value.trim();
    var cpswdValue = cpassword.value.trim();
    if(cpswdValue!="" && cpswdValue.match(pswdValue)){
        isPswdValid = true;
        setSuccess(cpassword);
    }
    else{
        setError(cpassword, "Please, Enter the same password");
    }
});


//checking the agree box
$("form input:checkbox").on("click", check);
function check() {  
    if($("input[name='agree-checkbox']").prop("checked") == true) {
        $("#signup-button").removeAttr("disabled");
        return;
    }
    $("#signup-button").attr("disabled",true);
};


//form submission using jquery ajax
$("#form").on("submit", function(event){
    if(isNameValid==true && isEmailValid==true && isPswdValid==true){
        $.ajax({
            type: "POST",
            url: "php/Register.php",
            data: {
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(response){
                if(response==1){
                    alert("Registered Successfully");
                    window.location.replace('./Login.html');
                }
                else{
                    alert("User already registered, Redirecting to login page");
                    window.location.replace('./Login.html');
                }
            },
            error: function(data){
                alert("Something went wrong, Try again!");
            }
        });
    }
    else{
        alert("Some information is missing, Kindly provide valid information");
    }
    event.preventDefault();
});