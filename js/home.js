function showLoginForm(){
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
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        data: JSON.stringify(data),
        success: function (data) {
            if(data.oneRole == '[ROLE_ADMIN]'){
                localStorage.setItem("user",JSON.stringify(data));
            }
            else if(data.oneRole == '[ROLE_STAFF]'){
                localStorage.setItem("user",JSON.stringify(data));
            }
            else if(data.oneRole == '[ROLE_CHECKER]')
                localStorage.setItem("user",JSON.stringify(data));
            // window.location.href = "/viewWS/index.html"
        }
    })
}
function showRegisterForm(){
    $('#myModal1').modal("show");
}
function showCheckerForm(){
    $('#myModal1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#myModal2').modal("show");
}
function CheckerRegisterAccount(){
    let username = $('#username1').val();
    let password = $('#password1').val();
    let fullname = $('#fullname1').val();
    let email = $('#email1').val();
    let phone = $('#phone1').val();
    let newCheckerAccount = {
        username: username,
        password: password,
        fullName: fullname,
        email: email,
        phone: phone,
        status : {
            id: 1
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
            createChecker(data.id)
        }
    })


}

function createChecker(id) {

}


function showStaffForm(){
    $('#myModal1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#myModal3').modal("show");
}
