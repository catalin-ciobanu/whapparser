
let CATEGORIES = BUCKETS = [];
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

var pieChart;
var barChart;

//load data for our charts
let createCharts = function () {
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
            if (pieChart) { pieChart.destroy(); }
            if (barChart) { barChart.destroy(); }

            pieChart = new Chart(
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
            barChart = new Chart(
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
};


//load buckets & categories data
(function () {
    // Creating Our XMLHttpRequest object 
    var xhr = new XMLHttpRequest();

    // Making our connection  
    var url = '/categoryView/getCategories';
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const resultSet = JSON.parse(this.responseText);
            CATEGORIES = resultSet.filter(item => item.type == "category").map(item => item.value);
            BUCKETS = resultSet.filter(item => item.type == "bucket").map(item => item.value);
        }
    }
    // Sending our request 
    xhr.send();
})();

document.addEventListener("DOMContentLoaded", () => {
    createCharts();
});

//edit a category
let createClickHandler = function (rowId) {
    //a(id="expenseType" + expense.id, href=path + "/category/" + expense.type) #{expense.type}
    let expenseTypeElem = document.getElementById("expenseType" + rowId);
    let elementParent = expenseTypeElem.parentElement;

    let inlineSelect = document.createElement("SELECT");
    inlineSelect.id = "expenseType" + rowId;
    inlineSelect.title = "Select a value";
    inlineSelect.classList.add("inline-select");

    hideElement(elementParent.children[0]);
    hideElement(elementParent.children[1]);

    for (var i = 0; i < CATEGORIES.length; i++) {
        var option = document.createElement("option");
        option.value = CATEGORIES[i];
        option.text = CATEGORIES[i];
        inlineSelect.appendChild(option);
    }
    elementParent.append(inlineSelect);

    let saveIcon = document.createElement("IMG");
    saveIcon.src = "/icons/save.png";
    saveIcon.classList.add("inline-img")
    saveIcon.classList.add("inline-edit");
    saveIcon.onclick = function () {
        updateElementAjax('type', inlineSelect.value, rowId, function (result) {
            //  alert(JSON.stringify(result));
            elementParent.removeChild(cancelIcon);
            elementParent.removeChild(inlineSelect);
            elementParent.removeChild(saveIcon);
            elementParent.children[0].innerText = inlineSelect.value;
            showElement(elementParent.children[0]);
            showElement(elementParent.children[1]);
            createCharts();
        });
    }

    elementParent.appendChild(saveIcon);

    let cancelIcon = document.createElement("IMG");
    cancelIcon.src = "/icons/cancel.png";
    cancelIcon.classList.add("inline-img")
    cancelIcon.classList.add("inline-edit");
    cancelIcon.onclick = function () {
        elementParent.removeChild(cancelIcon);
        elementParent.removeChild(inlineSelect);
        elementParent.removeChild(saveIcon);
        showElement(elementParent.children[0]);
        showElement(elementParent.children[1]);

    }

    elementParent.appendChild(cancelIcon);
}

let hideElement = function (element) {
    element.style = "display: none";
}

let showElement = function (element) {
    element.style = "";
}

let updateElementAjax = function (column, newValue, id, callback) {
    // Creating Our XMLHttpRequest object 
    var xhr = new XMLHttpRequest();

    let postObj = {
        field: column,
        value: newValue,
        id: id
    };

    // Making our connection  
    var url = '/monthlyView/updateCategoryBucket';
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        } else if (this.status != 200) {
            alert('Update did not work as expected');
            console.error(this.responseText);
        }
    }
    xhr.send(JSON.stringify(postObj));
}