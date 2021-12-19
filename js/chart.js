runChart();
function runChart(){
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let currentStaff = JSON.parse(localStorage.getItem("staff"));
    const ctx = document.getElementById('myChart').getContext('2d');
    let idStaff = currentStaff.id;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        url: "http://localhost:8080/api/bills/showByStaff/" + idStaff ,
        type: "GET",
        success: function (data) {
            let pending = [];
            let approval = [];
            let processing = [];
            let completed = [];
            let cancelled = [];
            let requestMoney = [];
            for (let i = 0; i < data.length; i++) {
                if(data[i].billStatus.id == 1){
                    pending.push(data[i]);
                }
                else if(data[i].billStatus.id == 2){
                    approval.push(data[i]);
                }else if(data[i].billStatus.id == 3){
                    processing.push(data[i]);
                }else if(data[i].billStatus.id == 4){
                    completed.push(data[i]);
                }else if(data[i].billStatus.id == 5){
                    cancelled.push(data[i]);
                }else if(data[i].billStatus.id == 6){
                    requestMoney.push(data[i]);
                }
            }
            console.log(pending);
            const myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Pending', 'Approval', 'Processing', 'Completed', 'Cancelled', 'Request Money'],
                    datasets: [{
                        label: '# of Votes',
                        data: [pending.length, approval.length, processing.length, completed.length, cancelled.length, requestMoney.length],
                        backgroundColor: [
                            "#F7464A",
                            "#46BFBD",
                            "#FDB45C",
                            "#949FB1",
                            "#4D5360",
                            "#FFC0CB"
                        ],
                        borderColor: [
                            '#FFFFFF',
                            '#FFFFFF',
                            '#FFFFFF',
                            '#FFFFFF',
                            '#FFFFFF',
                            '#FFFFFF)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    })
}