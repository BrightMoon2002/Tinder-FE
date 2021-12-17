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
            localStorage.setItem("user",JSON.stringify(data));
            window.location.href = "/viewWS/index.html"
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
function showStaffForm(){
    $('#myModal1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#myModal3').modal("show");
}
