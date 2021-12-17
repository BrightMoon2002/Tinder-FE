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
    $('#myCheckerAccountForm').modal("show");
}

function CheckerRegisterAccount(){
    let username = $('#usernameCheckerAccount').val();
    let password = $('#passwordCheckerAccount').val();
    let fullname = $('#fullnameCheckerAccount').val();
    let email = $('#emailCheckerAccount').val();
    let phone = $('#phoneCheckerAccount').val();
    let newCheckerAccount = {
        username: username,
        password: password,
        fullName: fullname,
        email: email,
        phone: phone,
        status : {
            id: 2
        },
        roles : [
            {
            id: 3
        }
        ]
    };

    $.ajax ({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCheckerAccount),
        url: "http://localhost:8080/api/accounts",
        success: function (data) {
            showCheckerDetails(data.id)
        }
    })

    event.preventDefault();


}

function showCheckerDetails(account_id) {
    $('#myCheckerAccountForm').remove();
    $('#myCheckerFormModel').modal('show');
    $('#idAccountChecker').val(account_id);

}

function createChecker() {
    let name = $('#nameChecker').val();
    let dob = $('#dobChecker').val();
    let gender = $('#genderChecker').val();
    let identity = $('#identityChecker').val();
    let hobbies = $('#addressChecker').val();
    let address = $('#addressChecker').val();
    let city = $('#cityChecker').val();
    let description = $('#descriptionChecker').val();
    let url_facebook = $('#facebookChecker').val();
    let account_id = $('#idAccountChecker').val();
    let newChecker = {
        name: name,
        dob: dob,
        gender: {
            id: gender
        },
        identity: identity,
        address: address,
        hobbies: hobbies,
        city: city,
        description: description,
        url_facebook: url_facebook,
        account: {
            id: account_id
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/checkers",
        type: "POST",
        data: JSON.stringify(newChecker),
        success: function (data) {
            $('#myCheckerFormModel').remove();
            $('#modalCreatedAccountSuccessfully').modal('show');
        }

    })
    event.preventDefault();
}


function closeModalCreatedAccountSuccessfully() {
    $('#modalCreatedAccountSuccessfully').remove();
}


function showStaffForm(){
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
    $('#').modal('show');

}

