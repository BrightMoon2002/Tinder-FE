let form = document.getElementById('myCheckerAccountForm');
let email = document.getElementById('emailCheckerAccount');
let email1 = document.getElementById('email2');
let userName = document.getElementById('usernameCheckerAccount');
let userName1 = document.getElementById('username2');
let password = document.getElementById('passwordCheckerAccount');
let password1 = document.getElementById('password2');
let fullName = document.getElementById('fullnameCheckerAccount');
let fullName1 = document.getElementById('fullname2');
let phone = document.getElementsByName('phoneCheckerAccount');
let phone1 = document.getElementById('phone2');
let checkbox = document.getElementsByName('invalidCheckBox');
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
    if (email.validity.valid && userName.validity.valid && fullName.validity.valid && password.validity.valid && phone.validity.valid ) {
        return true;
    } else {
        return false;
    }
}
function b() {
    if (email1.validity.valid && userName1.validity.valid && fullName1.validity.valid && password1.validity.valid && phone1.validity.valid ) {
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
    if (!phone.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error").innerHTML = text;

}
function myFunctionPhoneStaff() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("phone2").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (!phone1.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error7").innerHTML = text;

}

function myFunctionEmail() {
    let text;
    if (!email.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error1").innerHTML = text;

}

function myFunctionEmailStaff() {
    let text;
    if (!email.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error6").innerHTML = text;

}

function myFunctionUserName() {
    let text;
    if (!userName.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error2").innerHTML = text;

}

function myFunctionUserNameStaff() {
    let text;
    if (!userName.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error10").innerHTML = text;

}

function myFunctionPassword() {
    let text;
    if (!password.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error3").innerHTML = text;

}

function myFunctionPasswordStaff() {
    let text;
    if (!password1.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error9").innerHTML = text;

}

function myFunctionFullName() {
    let text;
    if (!fullName.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error4").innerHTML = text;

}

function myFunctionFullNameStaff() {
    let text;
    if (!fullName1.validity.valid) {
        text = "Input not valid";
    } else {
        text = "";
    }
    document.getElementById("error8").innerHTML = text;

}

function myFunctionAgreeForm() {
    let text;
    if (checkbox.check === false) {
        text = "You need agree";
    } else {
        text = "";
    }
    document.getElementById("error5").innerHTML = text;

}
