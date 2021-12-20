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
            if (data.status != "pending") {
                if (data.oneRole == '[ROLE_ADMIN]') {
                    localStorage.setItem("user", JSON.stringify(data));
                    window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/listBill.html"
                } else if (data.oneRole == '[ROLE_STAFF]') {
                    $.ajax({
                        url: "http://localhost:8080/api/staffs/find/" + data.id,
                        type: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        success: function (staff) {
                            localStorage.setItem("staff", JSON.stringify(staff));
                            localStorage.setItem("user", JSON.stringify(data));
                            window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/Staff.html"
                        }
                    })
                } else if (data.oneRole == '[ROLE_CHECKER]') {
                    $.ajax({
                        url: "http://localhost:8080/api/checkers/find/" + data.id,
                        type: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        success: function (checkers) {
                            localStorage.setItem("checkers", JSON.stringify(checkers));
                            localStorage.setItem("user", JSON.stringify(data));
                            window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/checkers.html"
                        },
                        error: function () {
                            window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/error-404.html"
                        }
                    })
                }
            }
            else {
                alert("Your account has not verified yet!!")
            }
        }
    })
    event.preventDefault();
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

function CheckerRegisterAccount() {
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
        balance: 0,
        status: {
            id: 2
        },
        roles: [
            {
                id: 3
            }
        ]
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCheckerAccount),
        url: "http://localhost:8080/api/accounts",
        success: function (data) {
            if (a() === true) {
                showCheckerDetails(data.id);
            } else {
                myFunctionPhone();
                myFunctionEmail();
                myFunctionUserName();
                myFunctionPassword();
                myFunctionFullName();
                myFunctionAgreeForm();
            }

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
    let hobbies = $('#hobbyChecker').val();
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
        assessment: {
            id: 1
        },
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
    window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/index.html"
}


function showStaffForm() {
    $('#myModal1').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $('#showFormAccountStaff').modal("show");
}

function RegisterAccountStaff() {
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
        roles: [{
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
        success: function (data) {
            console.log(data)
            let idAccount = data.id;
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "http://localhost:8080/api/genders",
                type: "GET",
                success: function (data) {
                    if (b() === true) {
                        let listTypes = [];
                        listTypes = data;
                        let userSelect = document.getElementById("gender");
                        listTypes.forEach(function (option) {
                            var opt = document.createElement('option');
                            opt.value = option.id;
                            opt.innerHTML = option.name;
                            userSelect.appendChild(opt);
                            $('#idAccount').val(idAccount);
                            $('#showFormAccountStaff').modal('hide');
                            $('#showFormRegisterForStaff').modal('show');
                        })
                    } else {
                        myFunctionPhoneStaff();
                        myFunctionEmailStaff();
                        myFunctionUserNameStaff();
                        myFunctionPasswordStaff();
                        myFunctionFullNameStaff();
                    }

                }
            })
            event.preventDefault();
        }

    })
    event.preventDefault();
}
var listimg = [];
async function upload(file) {
    let link;
    const ref = firebase.storage().ref();
    const metadata = {
        contentType: file.type
    }
    const name = file.name;
    const uploadIMG = ref.child(name).put(file, metadata);
    await uploadIMG
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            link = url;
        })
        .catch(console.error)
    listimg.push(link);
}

function onChangeIsImage(event){
    console.log(event.target.files);
    for (let i = 0; i < event.target.files.length; i++) {
        upload(event.target.files[i]);
    }
}
async function RegisterStaff() {
    console.log(listimg)
    let idAccount = $('#idAccount').val()
    let city = $('#city1').val();
    let description = $('#description1').val();
    let name = $('#name1').val();
    let dob = $('#dob1').val();
    let nationality = $('#nationality1').val();
    let height = $('#height1').val();
    let weight = $('#weight1').val();
    let gender = $('#gender').val();
    let form = {
        name: name,
        dob: dob,
        city: city,
        nationality: nationality,
        height: height,
        weight: weight,
        description: description,
        gender: {
            id: gender
        },
        account: {
            id: idAccount
        },
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/staffs",
        type: "POST",
        data: JSON.stringify(form),
        success: function (data) {
            console.log(data)
            let idAccount = data.id;
            for (let i = 0; i < 3; i++) {
                console.log(listimg[0])
                let avatarlist = {
                    image: listimg[0],
                    staff: {
                        id: idAccount
                    }
                }
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: "http://localhost:8080/api/avatar",
                    type: "POST",
                    data: JSON.stringify(avatarlist),
                    success: function () {
                        console.log("ANh" + i)
                    }
                })
            }

        }
    })
    console.log(listimg)
    event.preventDefault();
}
function khanh(a){
    console.log(a)
}