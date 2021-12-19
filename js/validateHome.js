let form = document.getElementById('myCheckerAccountForm');
let email = document.getElementById('emailCheckerAccount');
let userName = document.getElementById('usernameCheckerAccount');
let password = document.getElementById('passwordCheckerAccount');
let fullName = document.getElementById('fullnameCheckerAccount');
let phone = document.getElementById('emailCheckerAccount');
let error = document.querySelector('.error-404');


function b () {
    email.addEventListener("input", function (event) {
            //kiểm tra khi user bắt đầu nhập
            if (email.validity.valid && userName.validity.valid && password.validity.valid && fullName.validity.valid && phone.validity.valid) {
                //nếu valid, remove
                error.innerHTML = "";
                error.className = "error";
            }
        }, false
    );

    form.addEventListener("submit", function (event) {
        //kiểm tra khu user click submit
        if (!email.validity.valid || !userName.validity.valid || !password.validity.valid || !fullName.validity.valid || !phone.validity.valid) {
            error.innerHTML = "hey Babe, dot let input blank";
            error.className = "error active";
            event.preventDefault();
        }
    }, false);
}


function a() {
    if (email.validity.valid && userName.validity.valid && fullName.validity.valid && password.validity.valid && !phone.validity.valid ) {
        return true;
    } else {
        return false;
    }
}
function myFunctionPhone() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("phoneCheckerAccount").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(x) || x < 1 || x > 10) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error").innerHTML = text;

}

function myFunctionEmail() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("phoneCheckerAccount").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (!email.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error1").innerHTML = text;

}

function myFunctionUserName() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("phoneCheckerAccount").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (!email.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error2").innerHTML = text;

}

function myFunctionPassword() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("phoneCheckerAccount").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (!email.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error3").innerHTML = text;

}

function myFunctionFullName() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("phoneCheckerAccount").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (!email.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error4").innerHTML = text;

}
