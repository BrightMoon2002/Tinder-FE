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
                '   <th>Id Bill</th>\n' +
                '      <th>Cheker</th>\n' +
                '     <th>Staff</th>\n' +
                '     <th>Amount</th>\n' +
                '     <th>Status</th>\n' +
                '      <th>&nbsp;</th>\n' +
                '   </tr>\n' +
                '  </thead>\n';
            for (let i = 0; i < data.length; i++) {
                contentBill += getBill(data[i]);
            }
            document.getElementById('bills').innerHTML = contentBill;
        }
    });

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
            `<td class="status"><span class="active">Active</span></td>\n` +
            `<td>\n` +
            ` <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n` +
            ` <span aria-hidden="true"><i class="fa fa-close"></i></span>\n` +
            ` </button>` +
            ` </td>\n` +
            `</tr>`

    }


}


