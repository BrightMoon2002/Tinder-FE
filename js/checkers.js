// let currentUser = JSON.parse(localStorage.getItem("user"));
// let currentStaff = JSON.parse(localStorage.getItem("staff"));
// if (currentUser == null || currentStaff == null || currentUser.token == null) {



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



function showOrderStaff(staffId) {

    let currentChecker = JSON.parse(localStorage.getItem("checkers"))

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/checkers/" + currentChecker.id,
        success: function (checker) {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/staffs/" + staffId,
                success: function (staffClicked) {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/api/staffoption/staff/" + staffId,
                        success: function (optionStaff) {

                            const formatToCurrency = amount => {
                                return  amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " VND";
                            };


                            let optionsChoice = ""

                            for (let i=0; i<optionStaff.length;i++) {
                                optionsChoice += '<div class="form-check form-switch">\n' +
                                    '  <input class="form-check-input" type="checkbox" id="optionStaff'+optionStaff[i].id+'" name="optionSelect" value="'+optionStaff[i].id+'">\n' +
                                    '  <label class="form-check-label" for="flexSwitchCheckChecked">'+optionStaff[i].option.name+' - '+formatToCurrency(optionStaff[i].option.price)+'</label>\n' +
                                    '</div>'

                            }




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
                                '                       <h6>Checker Name: </h6>\n' +
                                '                       <input type="hidden" id="checkerClickedId" value="'+checker.id+'"></input>\n' +
                                '                       <p>'+checker.name+'</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="col-md-6">\n' +
                                '                       <h6>Staff Name: </h6>\n' +
                                '                       <input type="hidden" id="staffClickedId" value="'+staffClicked.id+'"></input>\n' +
                                '                       <p>'+staffClicked.name+'</p>\n' +
                                '                    </div>\n' +
                                '                    <div class="col-md-12">\n' +
                                '                            <h5>Services: </h5>' +
                                                            optionsChoice   +
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
                                '                        <button class="btn btn-primary" type="submit" onclick="submitOrder()">Submit Order</button>\n' +
                                '                    </div>\n' +
                                '                </form>'


                            document.getElementById("billCreatingFormModal").innerHTML = content



                        }
                    });




                }
            });



        }

    });

    $("#myCheckerBillCreatingForm").modal("show");


}

function submitOrder() {
    let checkbox = document.getElementsByName('optionSelect');

    let choices = []
    for (let i=0; i< checkbox.length; i++) {
        if (checkbox[i].checked === true)
        choices.push(checkbox[i].value)
    }

    let dateOrder = document.querySelector("#dateOrder").value;
    let dateEnd = document.querySelector("#dateEnd").value;
    let staffClickedId = document.querySelector("#staffClickedId").value;
    let checkerClickedId = document.querySelector("#checkerClickedId").value;

    let newBill = {
        dateOrder: dateOrder,
        dateEnd: dateEnd,
        staff :{
            id: staffClickedId
        },
        checker: {
            id: checkerClickedId
        },
        billStatus: {
            id: 1
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + currentUser.token
        },
        type: "POST",
        url: "http://localhost:8080/api/bills",
        data: JSON.stringify(newBill),
        success: function (data) {
            for (let i=0; i< choices.length; i++) {
                let newBillOption = {
                    bill: {
                        id: data.id
                    },
                    option: {
                        id: choices[i]
                    }
                }
                $.ajax ({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        // 'Authorization': 'Bearer ' + currentUser.token
                    },
                    type: "POST",
                    url: "http://localhost:8080/api/billOptions",
                    data: JSON.stringify(newBillOption),
                    success: function (result) {
                        console.log(result)
                    }
                })
            }
        }
    });
    event.preventDefault();
}

getAllStaffsForChecker()