



function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("checker");
    checkAut();
}

function checkAut() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let currentChecker = JSON.parse(localStorage.getItem("checker"));
    if (currentUser == null || currentChecker == null || currentUser.token == null) {
        window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/index.html"
    }

}


function getAllStaffsForChecker() {
    let content = "";
    let detail = "";


    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/staffs/allstaff",
        success: function (data) {

            for (let i =0; i<data.length; i++) {

                content +=
                    '            <div class="col-lg-4 col-sm-6 mb-4">\n' +
                    '                <div class="portfolio-item">\n' +
                    '                    <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal'+i+'">\n' +
                    '                        <div class="portfolio-hover">\n' +
                    '                            <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>\n' +
                    '                        </div>\n' +
                    '                        <img class="img-fluid" src="'+data[i].avatarUrl1+'" alt="..."/>\n' +
                    '                    </a>\n' +
                    '                    <div class="portfolio-caption">\n' +
                    '                        <div class="portfolio-caption-heading">'+data[i].name+'</div>\n' +
                    '                        <div class="portfolio-caption-subheading text-muted">'+data[i].description+'</div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>'


                detail +=
                    '<div class="portfolio-modal modal fade" id="portfolioModal'+i+'" tabindex="-1" role="dialog" aria-hidden="true">\n' +
                    '    <div class="modal-dialog">\n' +
                    '        <div class="modal-content">\n' +
                    '            <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal"/>\n' +
                    '            </div>\n' +
                    '            <div class="container">\n' +
                    '                <div class="row justify-content-center">\n' +
                    '                    <div class="col-lg-8">\n' +
                    '                        <div class="modal-body">\n' +
                    '                            <!-- Project details-->\n' +
                    '                            <h2 class="text-uppercase">'+data[i].name+'e</h2>\n' +
                    '                            <p class="item-intro text-muted">'+data[i].genders+'</p>\n' +
                    '                            <img class="img-fluid d-block mx-auto" src="'+data[i].avatarUrl1+'" alt="..."/>\n' +
                    '                            <p><br><b>DOB:</b> '+data[i].dob+'<br><b>City:</b> '+data[i].city+'<br><b>Nationality:</b> '+data[i].nationality+'<br><b>Height:</b> '+data[i].height+'<br><b>Weight:</b> '+data[i].weight+'<br><b>Description:</b> '+data[i].description+'<br><b>Services:</b> '+data[i].options+'</p>\n' +
                    '                            <ul class="list-inline">\n' +
                    '                                <li>\n' +
                    '                                    <strong>Images:</strong>\n' +
                    '                                </li>\n' +
                    '                                <li>\n' +
                    '                                    <img class="img-fluid" src="'+data[i].avatarUrl2+'" alt="..."/>' +
                    '                                    <img class="img-fluid" src="'+data[i].avatarUrl3+'" alt="..."/>' +
                    '                                </li>\n' +
                    '                            </ul>\n' +
                    '                            <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button" onclick="showOrderStaff('+data[i].id+')">\n' +
                    '                                \n' +
                    '                                Order\n' +
                    '                            </button>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>'
            }

            document.getElementById("staffList").innerHTML = content
            document.getElementById("staffDetails").innerHTML = detail

        }
    })
}

function getStaffOptions(id) {
    $.ajax ({
        type: "GET",
        url: "http://localhost:8080/api//api/options/"+id,
        success: function (data) {
            return data
        }
    })
}

function getStaffOptionsId(id) {

    let optionContent ="";

    $.ajax ({
        type: "GET",
        url: "http://localhost:8080/api/staffoption/staff/"+id,
        success: function (data) {
            for (let i=0; i<data.length; i++) {
                optionContent +='(data[i].option.id)' + '<input type="checkbox" id=option"'+data[i].option.id +'" name="'+data[i].option.id+'" value="'+ getStaffOptions(data[i].option.id)+'">\n' +
                    '<label for="option'+data[i].option.id +'"> '+getStaffOptions(data[i].option.id)+'</label><br>'
            }
            return optionContent;
        }
    })

    event.preventDefault();
}



function showOrderStaff(id) {

    let currentChecker = JSON.parse(localStorage.getItem("checkers"))

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/bills/showByChecker/" + currentChecker.id,
        success: function (data) {

            let content = '\n' +
                '                <form class="row g-3 needs-validation" novalidate>\n' +
                '                    <div class="col-md-6">\n' +
                '                        <label for="dateOrder" class="form-label">Date Order</label>\n' +
                '                        <input type="datetime-local" class="form-control" id="dateOrder" required>\n' +
                '                        <div class="invalid-feedback">\n' +
                '                            Please provide a valid date.\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-md-6">\n' +
                '                        <label for="dateEnd" class="form-label">Date End</label>\n' +
                '                        <input type="datetime-local" class="form-control" id="dateEnd" required>\n' +
                '                        <div class="invalid-feedback">\n' +
                '                            Please provide a valid date.\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-md-6">\n' +
                '                        <label for="fullnameCheckerAccount" class="form-label">Full Name</label>\n' +
                '                        <input type="text" class="form-control" id="fullnameCheckerAccount" required>\n' +
                '                        <div class="invalid-feedback">\n' +
                '                            Please provide a full name.\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-md-6">\n' +
                '                        <label for="emailCheckerAccount" class="form-label">Email</label>\n' +
                '                        <div class="input-group has-validation">\n' +
                '                            <span class="input-group-text" id="inputGroupPrepend">@</span>\n' +
                '                            <input type="text" class="form-control" id="emailCheckerAccount" aria-describedby="inputGroupPrepend" required>\n' +
                '                            <div class="invalid-feedback">\n' +
                '                                Email is not correct.\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-md-6">\n' +
                '                        <label for="phoneCheckerAccount" class="form-label">Phone</label>\n' +
                '                        <input type="text" class="form-control" id="phoneCheckerAccount" required>\n' +
                '                        <div class="invalid-feedback">\n' +
                '                            Please provide a valid phone.\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-12">\n' +
                '                        <div class="form-check">\n' +
                '                            <input class="form-check-input" type="checkbox" id="invalidCheck" required>\n' +
                '                            <label class="form-check-label" for="invalidCheck">\n' +
                '                                Agree to terms and conditions\n' +
                '                            </label>\n' +
                '                            <div class="invalid-feedback">\n' +
                '                                You must agree before submitting.\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-12">\n' +
                '                        <button class="btn btn-primary" type="submit" onclick="CheckerRegisterAccount()">Submit form</button>\n' +
                '                    </div>\n' +
                '                </form>'

        }

    })
}




getAllStaffsForChecker()