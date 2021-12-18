



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
                    '                            <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">\n' +
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


function getBillByCheckerId(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/bills/showByChecker/" + id,

    })
}




getAllStaffsForChecker()