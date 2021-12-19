// import {runChart} from './chart.js'
// runChart();
let currentUser = JSON.parse(localStorage.getItem("user"));
let currentStaff = JSON.parse(localStorage.getItem("staff"));
if (currentUser == null || currentStaff == null || currentUser.token == null) {
    window.location.href = "/front_end/index.html";
}

function resetStaff() {

    $.ajax({
        url: "http://localhost:8080/api/staffs/" + currentStaff.id,
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (staff) {
            localStorage.removeItem("staff");
            localStorage.setItem("staff", JSON.stringify(staff));
            checkAut();
        }
    })
    event.preventDefault();
}

function checkAut() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let currentStaff = JSON.parse(localStorage.getItem("staff"));
    if (currentUser == null || currentStaff == null || currentUser.token == null) {
        window.location.href = "/front_end/index.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("staff");
    checkAut();
}

function showInformation() {
    $('#myInfor').modal("show");
    $('#fullname1').val(currentUser.name);
    $('#city1').val(currentStaff.city);
    $('#description1').val(currentStaff.description);
    $('#name1').val(currentStaff.name);
    $('#dob1').val(currentStaff.dob);
    $('#nationality1').val(currentStaff.nationality);
    $('#height1').val(currentStaff.height);
    $('#weight1').val(currentStaff.weight);
    $('#showForInforForStaff').modal("show");
    event.preventDefault();
}

function showFormeditInfor() {
    $('#showForInforForStaff').modal("hide")
    $('#fullname2').val(currentUser.name);
    $('#city2').val(currentStaff.city);
    $('#description2').val(currentStaff.description);
    $('#name2').val(currentStaff.name);
    $('#dob2').val(currentStaff.dob);
    $('#nationality2').val(currentStaff.nationality);
    $('#height2').val(currentStaff.height);
    $('#weight2').val(currentStaff.weight);
    $('#showFormEditForStaff').modal("show")
}

function cancelEditInfor() {
    $('#showForInforForStaff').modal("hide");
}

function cancelEditInfor1() {
    $('#showForInforForStaff').modal("show");
    $('#showFormEditForStaff').modal("hide");
}

function editInfor() {
    let idAccount = currentUser.id
    let idStaff = currentStaff.id;
    let idGender = currentStaff.gender.id;
    let city = $('#city2').val();
    let description = $('#description2').val();
    let name = $('#name2').val();
    let dob = $('#dob2').val();
    let nationality = $('#nationality2').val();
    let height = $('#height2').val();
    let weight = $('#weight2').val();
    let form = {
        id: idStaff,
        name: name,
        dob: dob,
        city: city,
        nationality: nationality,
        height: height,
        weight: weight,
        description: description,
        gender: {
            id: idGender
        },
        account: {
            id: idAccount
        },
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/staffs/" + idStaff,
        type: "PUT",
        data: JSON.stringify(form),
        success: function (data) {
            console.log(data)
            resetStaff();
            $('#showForInforForStaff').modal("hide");
        }
    })
    event.preventDefault();
}

function FormChooseService() {
    $('#FormChooseService').modal("show");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/options",
        type: "GET",
        success: function (data) {
            let showcheckbox = document.getElementById("showcheckbox");
            console.log(data)
            let d = ''
            for (let i = 0; i < data.length; i++) {
                d += `
                 <div class="form-check">
                    <input class="form-check-input" name="option" type="checkbox" value="${data[i].id}" id="flexCheckChecked" checked>
                    <label class="form-check-label" for="flexCheckChecked">
                        ${data[i].name}
                    </label>
                </div>
                `
            }
            showcheckbox.innerHTML = d;
        }
    })
    event.preventDefault();
}

function chooseServiceForStaff() {
    let idStaff = currentStaff.id;
    $('#FormChooseService').modal("hide");
    let checkbox = document.getElementsByName('option');
    let a = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            a.push(parseFloat(checkbox[i].value));
        }
    }
    for (let i = 0; i < a.length; i++) {
        let staffoption = {
            staff: {
                id: idStaff
            },
            option: {
                id: a[i]
            }
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            },
            url: "http://localhost:8080/api/staffoption",
            type: "POST",
            data: JSON.stringify(staffoption),
            success: function (data) {
                console.log(data)
            }
        })
    }
    event.preventDefault();
}


function showBill(a) {
    let showBillPeding = document.getElementById("showBillPeding");
    let idStaff = currentStaff.id;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: `http://localhost:8080/api/bills/showByStaffAndStatus/${idStaff}/${a}`,
        type: "GET",
        success: function (data) {
            let content = `<thead><tr>
            <th scope="col">Staff Name</th>
            <th scope="col">Checker Name</th>
            <th scope="col">Date Order</th>
            <th scope="col">Date End</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
            
        </tr>
        </thead>
        <tbody>
            `
            for (let i = 0; i < data.length; i++) {
                content += getAllBillPending(data[i]);
            }
            content += `</tbody></table>`
            document.getElementById('showBillPeding').innerHTML = content;
        }
    })
    event.preventDefault();
}

function getAllBillPending(data) {
    if (data.billStatus.id == 1) {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
    <td>
    <button type="button" class="btn btn-primary" onclick="setStatusPendingToAproval(this)" value="${data.id}">Aproval</button>
</td>
<td>
    <button type="button" class="btn btn-primary" onclick="setStatusPendingToCancel(this)" value="${data.id}" >Cancel</button>
</td>
<td>
    <button type="button" class="btn btn-primary" onclick="seeDetailBill(this)" value="${data.id}">See Detail Bill</button>
</td>
    </tr>
    `
    } else if (data.billStatus.id == 2) {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
    <td>
    <button type="button" class="btn btn-primary" onclick="setStatusAprovalToProcessing(this)" value="${data.id}">Processing</button>
</td>
<td>
    <button type="button" class="btn btn-primary" onclick="seeDetailBill(this)" value="${data.id}">See Detail Bill</button>
</td>
    </tr>
    `
    } else if (data.billStatus.id == 3) {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
    <td>
    <button type="button" class="btn btn-primary" onclick="setStatusProcessingToRequestForMoney(this)" value="${data.id}">Request For Money</button>
</td>
<td>
    <button type="button" class="btn btn-primary" onclick="seeDetailBill(this)" value="${data.id}">See Detail Bill</button>
</td>
    </tr>
    `
    } else if (data.billStatus.id == 6) {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
    <td>
    <button type="button" class="btn btn-primary" onclick="seeDetailBill(this)" value="${data.id}">See Detail Bill</button>
</td>
    </tr>
    `
    } else if (data.billStatus.id == 5) {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
</td>
<td>
    <button type="button" class="btn btn-primary" onclick="seeDetailBill(this)" value="${data.id}">See Detail Bill</button>
</td>
    </tr>
    `
    }
    else if (data.billStatus.id == 4) {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
</td>
<td>
    <button type="button" class="btn btn-primary" onclick="seeDetailBill(this)" value="${data.id}">See Detail Bill</button>
</td>
    </tr>
    `
    }
}

function setStatusPendingToAproval(a) {
    let idBill = a.getAttribute("value");
    console.log(idBill)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/bills/editStatus/" + idBill,
        type: "PUT",
        success: function (data) {
            showBill(1);
        }
    })
    event.preventDefault();
}

function setStatusPendingToCancel(a) {
    let idBill = a.getAttribute("value");
    console.log(idBill)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/bills/cancelStatus/" + idBill,
        type: "PUT",
        success: function (data) {
            showBill(1);
        }
    })
    event.preventDefault();
}

function setStatusAprovalToProcessing(a) {
    let idBill = a.getAttribute("value");
    console.log(idBill);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/bills/setStatusProcessing/" + idBill,
        type: "PUT",
        success: function (data) {
            showBill(2);
        }
    })
    event.preventDefault();
}

function setStatusProcessingToRequestForMoney(a) {
    let idBill = a.getAttribute("value");
    console.log(idBill);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/bills/setStatusRequestMoney/" + idBill,
        type: "PUT",
        success: function (data) {
            showBill(3);
        }
    })
    event.preventDefault();
}

function closeBill() {
    document.getElementById('showBillPeding').innerHTML = ``;
}

function seeDetailBill(a) {
    let idBill = a.getAttribute("value");
    $.ajax({
        url: "http://localhost:8080/api/billOptions/findByBill/" + idBill,
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (billoption1) {
            $.ajax({
                url: "http://localhost:8080/api/bills/" + idBill,
                type: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + currentUser.token
                },
                success: function (bill) {
                    console.log(bill);
                    $('#billIdDetail').val(bill.id);
                    $('#showDetailBill').modal("show")
                    $('#staffNameDetail').val(bill.staff.name);
                    $('#checkerNameDetail').val(bill.checker.name);
                    $('#checkerAddressDetails').val(bill.checker.address)
                    $('#BillTime').val("0")
                    $('#billStatusDetails').val(bill.billStatus.name);
                    $('#billAmountDetails').val(bill.amount);
                    let text = ``;
                    for (let i = 0; i < billoption1.length; i++) {
                        text += `
                            <tr>
                              <td>${i}</td>
                              <td>${billoption1[i].option.name}</td>                        
                            </tr>
                        `
                    }
                    document.getElementById("table").innerHTML = text;
                }
            })
        }
    })
    event.preventDefault();
}
function setStatus(){
    $.ajax({
        url: "http://localhost:8080/api/status",
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data){
            let listStatus = [];
            listStatus = types;
            let userSelect = document.getElementById("stt");
            listStatus.forEach(function (option) {
                var opt = document.createElement('option');
                opt.value = option.id;
                opt.innerHTML = option.nameType;
                userSelect.appendChild(opt);
            })
        }
    })
}
getGuest()
function getGuest(){
    let idStaff = currentStaff.id;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: `http://localhost:8080/api/bills/showByStaffAndStatus/${idStaff}/4`,
        type: "GET",
        success: function (data) {
            document.getElementById("totalGuest").innerHTML = `${data.length}`
        }
    })
}
getTotalMoney();
function getTotalMoney(){
    let idStaff = currentStaff.id;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: `http://localhost:8080/api/bills/showByStaffAndStatus/${idStaff}/4`,
        type: "GET",
        success: function (data) {
            let sum = 0;
            for (let i = 0; i < data.length ; i++) {
                sum += data[i].amount;
            }
            document.getElementById("totalMoney").innerHTML = `${sum}$`
        }
    })
    event.preventDefault();
}
