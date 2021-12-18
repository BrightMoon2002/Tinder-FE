(function ($) {

    "use strict";

    $('[data-toggle="tooltip"]').tooltip()

})(jQuery);


function showListBill() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/bills",
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
        `<td class="status"><button style="border: none; border-radius: 200px; width: 73,5px" id="editStatus" value="${bill.id}" onclick="editStatusAccept(this)" ><span class="active">${bill.billStatusName}</span></button></td>\n` +
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
    let idBill = $('#viewOne').val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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
    let idBill = $('#editStatus').val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/bill/editStatus/" + idBill,
        success : showListBill
    });
    event.preventDefault();
}


