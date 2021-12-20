(function ($) {

    "use strict";

    $('[data-toggle="tooltip"]').tooltip()

})(jQuery);
let currentUser = JSON.parse(localStorage.getItem("user"));
let checker = JSON.parse(localStorage.getItem("checker"));
let staff = JSON.parse(localStorage.getItem("staff"));
if (currentUser == null || currentUser.token == null ||checker != null || staff != null ) {
    window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/listBill.html";
}

function checkToken() {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser == null || currentUser.token == null) {
        window.location.href = "/Casestudy4_Checker_Duy_FrontEnd/index.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    checkToken();
}

function showListBill() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/bills",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let contentBill = '<thead>\n' +
                '   <tr>\n' +
                '    <th>&nbsp;</th>\n' +
                '   <th style="color: red">Id Bill</th>\n' +
                '      <th style="color: red">Cheker</th>\n' +
                '     <th style="color: red">Staff</th>\n' +
                '     <th style="color: red">Amount</th>\n' +
                '     <th style="color: red">Status</th>\n' +
                '     <th style="color: red">Assessment</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '   </tr>\n' +
                '  </thead>\n';
            for (let i = 0; i < data.length; i++) {
                contentBill += getBill(data[i]);
            }
            document.getElementById('bills').innerHTML = contentBill;
        }
    });


}

function getBill(bill) {
    return `<tr class="alert" role="alert">\n` +
        `<td>\n` +
        `<label class="checkbox-wrap checkbox-primary">\n` +
        `<input type="checkbox" checked>\n` +
        `<span class="checkmark"></span>\n` +
        `</label>\n` +
        `</td>\n` +
        `<td class="d-flex align-items-center">\n` +
        `<div class="pl-3 email">\n` +
        `<span>${bill.id}</span>\n` +
        `<span>order: ${bill.dateOrder}</span>\n` +
        `</div>\n` +
        `</td>\n` +
        `<td>${bill.checkerName}</td>\n` +
        `<td>${bill.staffName}</td>\n` +
        `<td>${bill.amount}</td>\n` +
        `<td class="status"><button style="border: none; border-radius: 200px; background-color: white" id="editStatus" value="${bill.id}" onclick="editStatusAccept(this)" ><span class="active">${bill.billStatusName}</span></button></td>\n` +
        `<td >${bill.content}</td>\n` +
        `<td>\n` +
        ` <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n` +
        ` <span aria-hidden="true"><i class="fa fa-close"></i></span>\n` +
        ` </button>` +
        `</td>\n` +
        `<td>\n` +
        `<button id="viewOne" class="close" data-dismiss="alert" onclick="showView(this)" value="${bill.id}">\n` +
        ` <span aria-hidden="true">View</span>\n` +
        `</button>` +
        ` </td>\n` +
        `</tr>`;
}

function showView(id) {
    let idBill = id.getAttribute("value");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/bills/view/" + idBill,
        success: function (data) {
            let contentView = '<thead>\n' +
                '   <tr>\n' +
                '    <th style="color: red">&nbsp;</th>\n' +
                '   <th style="color: red">Id Bill</th>\n' +
                '      <th style="color: red">Cheker</th>\n' +
                '     <th style="color: red">Staff</th>\n' +
                '     <th style="color: red">Amount</th>\n' +
                '     <th style="color: red">Status</th>\n' +
                '     <th style="color: red">Assessment</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '   </tr>\n' +
                '  </thead>\n';
            contentView = contentView + getBill(data);
            document.getElementById('bills').innerHTML = contentView;
        }
    });
    event.preventDefault();
}

function editStatusAccept(id) {
    let idBill = id.getAttribute("value");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "PUT",
        url: "http://localhost:8080/api/bills/editStatus/" + idBill,
        success: showListBill
    });
    event.preventDefault();
}

function showAllAccount() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/accounts",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let contentBill = '<thead>\n' +
                '   <tr>\n' +
                '    <th>&nbsp;</th>\n' +
                '   <th style="color: red">Id</th>\n' +
                '      <th style="color: red">UserName</th>\n' +
                '     <th style="color: red">Balance</th>\n' +
                '     <th style="color: red">Email</th>\n' +
                '     <th style="color: red">Phone</th>\n' +
                '     <th style="color: red">status</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '   </tr>\n' +
                '  </thead>\n';
            for (let i = 0; i < data.length; i++) {
                contentBill += getAccount(data[i]);
            }
            document.getElementById('bills').innerHTML = contentBill;
        }
    });
    event.preventDefault();
}

function getAccount(data) {
    return `<tr class="alert" role="alert">\n` +
        `<td>\n` +
        `<label class="checkbox-wrap checkbox-primary">\n` +
        `<input type="checkbox" checked>\n` +
        `<span class="checkmark"></span>\n` +
        `</label>\n` +
        `</td>\n` +
        `<td class="d-flex align-items-center">\n` +
        `<div class="pl-3 email">\n` +
        `<span>${data.id}</span>\n` +
        `<span>Begin: ${data.dateSignIn}</span>\n` +
        `<td>${data.username}</td>\n` +
        `</div>\n` +
        `</td>\n` +
        `<td>${data.balance}</td>\n` +
        `<td>${data.email}</td>\n` +
        `<td>${data.phone}</td>\n` +
        `<td class="status"><button style="border: none; width: 100px; background-color: white" id="editStatus" onclick="editBlockAccount(this)"  idAccount="${data.id}" value="${data.status.id}" ><span class="active">${data.status.name}</span></button></td>\n` +
        `<td>\n` +
        `<button id="viewOne" class="close" data-dismiss="alert" onclick="showViewAccount(this)" value="${data.id}"><span aria-hidden="true">View</span></button>` +
        ` </td>\n` +
        `</tr>`;
}

function showViewAccount(id) {
    let idAccount = id.getAttribute("value");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        type: "GET",
        url: "http://localhost:8080/api/accounts/" + idAccount,
        success: function (data) {
            let contentView = '<thead>\n' +
                '   <tr>\n' +
                '    <th>&nbsp;</th>\n' +
                '   <th style="color: red">Id</th>\n' +
                '      <th style="color: red">UserName</th>\n' +
                '     <th style="color: red">Password</th>\n' +
                '     <th style="color: red">Balance</th>\n' +
                '     <th style="color: red">Email</th>\n' +
                '     <th style="color: red">FullName</th>\n' +

                '     <th style="color: red">Phone</th>\n' +
                '     <th style="color: red">status</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '      <th style="color: red">&nbsp;</th>\n' +
                '   </tr>\n' +
                '  </thead>\n';
            contentView = contentView + getAccount(data);
            document.getElementById('bills').innerHTML = contentView;
        }
    });
    event.preventDefault();
}

function editBlockAccount(id, id2) {
    let idStatus = id.getAttribute("value");
    let idAccount = id.getAttribute("idAccount")
    if (idStatus == 1 || idStatus == 2) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            },
            type: "PUT",
            url: "http://localhost:8080/api/accounts/blockAccount/" + idAccount,
            success: showAllAccount
        });
        event.preventDefault();
    } else {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            },
            type: "PUT",
            url: "http://localhost:8080/api/accounts/unBlockAccount/" + idAccount,
            success: showAllAccount
        });
        event.preventDefault();
    }
}