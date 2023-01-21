
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
    const lastMonth = month == 1 ? 12 : parseInt(month) - 1;
    const year = document.querySelector("[name=year]").value;
    const lastYear = month == 1 ? parseInt(year) - 1 : year;
    url += "?month=" + year + "-" + (month.length == 2 ? month : "0" + month);
    url += "&lastMonth=" + lastYear + "-" + (lastMonth.toString().length == 2 ? lastMonth : "0" + lastMonth);
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const resultSet = JSON.parse(this.responseText);
            new Chart(
                document.getElementById('pie_categories'),
                {
                    type: 'doughnut',
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    },
                    data: {
                        //filter out all Totals and then map for category (or sum lower when values are set)
                        labels: resultSet[0].filter(function (row) {
                            return row.category.startsWith("Total") ? null : row.category;
                        }).map(row => row.category),
                        datasets: [{
                            data: resultSet[0].filter(function (row) {
                                return row.category.startsWith("Total") ? null : row.sum;
                            }).map(row => row.sum),
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
                        labels: resultSet[0].filter(function (row) {
                            return row.category.startsWith("Total") ? null : row.category;
                        }).map(row => row.category),
                        datasets: [{
                            label: 'Luna curenta: ' + year + "-" +
                                (month.length == 2 ? month : "0" + month),
                            data: resultSet[0].filter(function (row) {
                                return row.category.startsWith("Total") ? null : row.sum;
                            }).map(row => row.sum),
                            hoverOffset: 4,
                            backgroundColor: [
                                '#4FC3A1'
                            ]
                        }, {
                            label: 'Luna trecuta: ' + lastYear + "-" +
                                (lastMonth.toString().length == 2 ? lastMonth : "0" + lastMonth),
                            data: resultSet[1].filter(function (row) {
                                return row.category.startsWith("Total") ? null : row.sum;
                            }).map(row => row.sum),
                            hoverOffset: 4,
                            backgroundColor: [
                                '#324960'
                            ]
                        }

                        ]
                    }
                }
            );
        }
    }
    // Sending our request 
    xhr.send();
})();
