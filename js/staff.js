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
    </tr>
    `
    } else {
        return `
    <tr> 
    <td>${data.staff.name}</td>
    <td>${data.checker.name}</td>
    <td>${data.dateOrder}</td>
    <td>${data.dateEnd}</td>
    <td>${data.amount}</td>
    <td>${data.billStatus.name}</td>
    <td>
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
