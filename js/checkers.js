// let currentUser = JSON.parse(localStorage.getItem("user"));
// let currentStaff = JSON.parse(localStorage.getItem("staff"));
let currentChecker = JSON.parse(localStorage.getItem("checkers"));
// if (currentUser == null || currentStaff == null || currentUser.token == null) {



function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("checkers");
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
                                    '  <input class="form-check-input" type="checkbox" id="optionStaff'+optionStaff[i].option.id+'" name="optionSelect" value="'+optionStaff[i].option.id+'">\n' +
                                    '  <label class="form-check-label" for="flexSwitchCheckChecked">'+optionStaff[i].option.name+' - '+formatToCurrency(optionStaff[i].option.price)+'</label>\n' +
                                    '</div>'

                            }

                            let content = '\n' +
                                '                <form class="row g-3 needs-validation" novalidate>\n' +
                                '                    <div class="col-md-6">\n' +
                                '                        <label for="dateOrder" class="form-label">Time Order</label>\n' +
                                '                        <input type="time" step="3600000" class="form-control" id="timeOrder" required>\n' +
                                '                        <div class="invalid-feedback">\n' +
                                '                            Please provide a valid date.\n' +
                                '                        </div>\n' +
                                '                    </div>\n' +
                                '                    <div class="col-md-6">\n' +
                                '                        <label for="dateEnd" class="form-label">Time End</label>\n' +
                                '                        <input type="time" step="3600000" class="form-control" id="timeEnd"  required>\n' +
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

    console.log("mmmmm " + choices)

    let dateOrder = document.querySelector("#timeOrder").value;
    let today = new Date();

    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let timeOrder = yyyy + '-' + mm + '-' + dd +'T'+dateOrder;




    let dateEnd = document.querySelector("#timeEnd").value;
    let timeEnd = yyyy + '-' + mm + '-' + dd +'T'+dateEnd;
    let staffClickedId = document.querySelector("#staffClickedId").value;
    let checkerClickedId = document.querySelector("#checkerClickedId").value;

    let newBill = {
        dateOrder: timeOrder,
        dateEnd: timeEnd,
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
        success: function (bill) {
            let amount = 0;
            for (let i=0; i< choices.length; i++) {
                let newBillOption = {
                    bill: {
                        id: bill.id
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
                    success: function (billOption) {
                        console.log(billOption)
                       $.ajax ({
                           headers: {
                               'Accept': 'application/json',
                               'Content-Type': 'application/json'
                               // 'Authorization': 'Bearer ' + currentUser.token
                           },
                           type: "GET",
                           url: "http://localhost:8080/api/options/" + billOption.option.id,
                           success: function (optionsGet) {
                                amount += optionsGet.price
                               console.log("amountlllll " + amount)

                           }
                       });
                    }
                });
            }

            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    // 'Authorization': 'Bearer ' + currentUser.token
                },
                type: "GET",
                url: "http://localhost:8080/api/bills/hour/" + bill.id,
                success: function (hourDiff) {
                    amount = hourDiff*amount

                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            // 'Authorization': 'Bearer ' + currentUser.token
                        },
                        type: "PUT",
                        url: "http://localhost:8080/api/bills/amount/" + bill.id +"/" + amount,
                        success: function (amountSet) {
                            $('#modalCreatedAccountSuccessfully').modal('show');
                            window.location.href="/Casestudy4_Checker_Duy_FrontEnd/checkers.html"
                        }
                    })
                }
            });


        }
    });
    event.preventDefault();
}



function getBillList2() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/bills/showByChecker/" + currentChecker.id,
        success: function (data) {
            let contentTable = ''

            for (let i = 0; i < data.length; i++) {
                contentTable += getBillChecker2(data[i]);
                console.log(contentTable)
            }
            let contentBill =
                '<table class="table caption-top">\n' +
                '  <caption>List of Bills</caption>\n' +
                '  <thead>\n' +
                '    <tr>\n' +
                '      <th scope="col">#</th>\n' +
                '      <th scope="col">CHECKER</th>\n' +
                '      <th scope="col">STAFF</th>\n' +
                '      <th scope="col">ORDERED DATE</th>\n' +
                '      <th scope="col">ENDED DATE</th>\n' +
                '      <th scope="col">CHARGED FEE</th>\n' +
                '      <th scope="col">STATUS</th>\n' +
                '      <th scope="col">ASSESSMENT</th>\n' +
                '      <th scope="col" style="text-align: center">ACTION</th>\n' +
                '    </tr>\n' +
                '  </thead>\n' +
                '  <tbody>\n' +
                contentTable+
                '  </tbody>\n' +
                '</table>'


            document.getElementById('checkerBills').innerHTML = contentBill;

            // console.log(contentBill)
        }
    });
}


function getBillChecker2(bill) {
    let content = "";
    if (bill.billStatus.id === 6) {
        content =         `<td>\n` +
            `<button id="viewOne" class="close" data-dismiss="alert" onclick="createAssessment(this)" value="${bill.id}">\n` +
            ` <span aria-hidden="true">Assessment</span>\n` +
            `</button>` +
            ` </td>\n`
    } else {
        content = `<td>\n` +
            `<button id="viewOne" class="close" data-dismiss="alert" onclick="createAssessment(this)" value="${bill.id}" hidden>\n` +
            ` <span aria-hidden="true">Assessment</span>\n` +
            `</button>` +
            ` </td>\n`
    }





    return                 '<tr>\n' +
        '      <th scope="row">'+bill.id+'</th>\n' +
        '      <td>'+bill.checker.name+'</td>\n' +
        '      <td>'+bill.staff.name+'</td>\n' +
        '      <td>'+bill.dateOrder+'</td>\n' +
        '      <td>'+bill.dateEnd+'</td>\n' +
        '      <td>'+bill.amount+'</td>\n' +
        '      <td>'+bill.billStatus.name+'</td>\n' +
        '      <td>'+bill.assessment.content+'</td>\n' +
        content +
        '    </tr>\n'
}

function createAssessment(id) {
    alert("hello")
}




getBillList2()
getAllStaffsForChecker()