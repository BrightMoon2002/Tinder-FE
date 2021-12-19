let form = document.getElementById('myCheckerAccountForm');
let email = document.getElementById('emailCheckerAccount');
let userName = document.getElementById('usernameCheckerAccount');
let password = document.getElementById('passwordCheckerAccount');
let fullName = document.getElementById('fullnameCheckerAccount');
let phone = document.getElementById('emailCheckerAccount');
let error = document.querySelector('.error-404');

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

function a() {
    if (email.validity.valid && userName.validity.valid && fullName.validity.valid && password.validity.valid && !phone.validity.valid ) {
        return true;
    } else {
        return false;
    }
}

