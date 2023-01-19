const pie_data = {
    labels: ['Farmacie', 'Cheltuieli', 'Oana'],
    datasets: [{
        data: [2004, 20014, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

(function () {
    // Creating Our XMLHttpRequest object 
    var xhr = new XMLHttpRequest();

    // Making our connection  
    var url = '/monthlyView/getChartData';
    const month = document.querySelector("[name=month]").value;
    const year = document.querySelector("[name=year]").value;
    url += "?month=" + year + "-" + (month.length == 2 ? month : "0" + month);
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const resultSet = JSON.parse(this.responseText);
            new Chart(
                document.getElementById('pie_categories'),
                {
                    type: 'pie',
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    },
                    data: {
                        labels: resultSet.map(row => row.category),
                        datasets: [{
                            //label: 'Cheltuieli per categorii',
                            data: resultSet.map(row => row.sum),
                            hoverOffset: 4
                        }]
                    }
                }
            );
            new Chart(
                document.getElementById('bar_weekly'),
                {
                    type: 'bar',
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    },
                    data: {
                        labels: resultSet.map(row => row.category),
                        datasets: [{
                            label: 'Cheltuieli per categorii',
                            backgroundColor: [
                                '#4FC3A1'
                            ],
                            data: resultSet.map(row => row.sum),
                            hoverOffset: 4
                        }]
                    }
                }
            );
        }
    }
    // Sending our request 
    xhr.send();
})();
