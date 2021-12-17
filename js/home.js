function showLoginForm() {
    console.log("ABC")
    $('#myModal').modal("show");
}

function signIn() {
    let username = $('#username').val();
    let password = $('#password').val();
    let data = {
        username: username,
        password: password
    }
    $.ajax({
        url: "http://localhost:8080/api/login",
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        data: JSON.stringify(data),
        success: function (data) {
            if (data.oneRole == '[ROLE_ADMIN]') {
                localStorage.setItem("user", JSON.stringify(data));
            } else if (data.oneRole == '[ROLE_STAFF]') {
                localStorage.setItem("user", JSON.stringify(data));
            } else if (data.oneRole == '[ROLE_CHECKER]')
                localStorage.setItem("user", JSON.stringify(data));
            // window.location.href = "/viewWS/index.html"
        }
    })
}

function showRegisterForm() {
    $('#myModal1').modal("show");
}

function showCheckerForm() {
    $('#myModal1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#myModal2').modal("show");
}

function RegisterAccount() {
    let username = $('#username1').val();
    let password = $('#password1').val();
    let fullname = $('#fullname1').val();
    let email = $('#email1').val();
    let phone = $('#phone1').val();
    let status;
}

function showStaffForm() {
    $('#myModal1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#myModal3').modal("show");
}

function RegisterStaff() {
    let username = $('#username2').val();
    let password = $('#password2').val();
    let fullname = $('#fullname2').val();
    let email = $('#email2').val();
    let phone = $('#phone2').val();
    let balance = 0.0;
    let form = {
        username: username,
        password: password,
        fullName: fullname,
        email: email,
        phone: phone,
        balance: balance,
        status: {
            id: 1
        },
        roles :[{
            id: 2
        }]
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/accounts",
        type: "POST",
        data: JSON.stringify(form),
        success: function (data){
            console.log(data)
            let idAccount = data.id;
            showFormRegisterStaff(idAccount);
        }
    })
    event.preventDefault();
}
function showFormRegisterStaff(idAccount){
    $('#myModal4').modal('show');

}

