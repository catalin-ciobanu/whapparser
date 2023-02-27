const processor = require('../utils/processor');
const conn = require("../services/db");

/**
 * Self explainatory
 * @param {*} cb 
 */
const getAllExpenses = function (cb) {
    conn.query("SELECT * FROM expenses", [],
        function (err, rows) {
            cb(err, rows);
        }
    );
};

const getExpensesByMonth = function (month, year, cb) {
    if ((!month || !year) && (!conn.metadata.current)) {
        //sunt pe cazul in care vin "default" - prima oara cand pornesc sesiunea
        getExpensesFromNewestMonth(function (err, rows) {
            month = rows[0].month;
            year = rows[0].year;
            var first_day = new Date(year, month - 1, '1');
            //ultima zi a unei luni e cu 0 a lunii urmatoare (mai sus am facut -1 pt luna curenta)
            var last_day = new Date(year, month, 0);
            //fac refresh in caz ca s-a adaugat o luna sau un an nou
            conn.refreshMetadata(month, year, function () {
                conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?)", [first_day, last_day],
                    function (err, rows) {
                        //we pass the expenses for the needed month & year + the metadata
                        cb(err, rows, conn.metadata);
                    }
                );
            });
        });
    } else {
        if ((!month || !year) && (conn.metadata.current)) {
            month = conn.metadata.current.selectedMonth;
            year = conn.metadata.current.selectedYear;
        }
        var first_day = new Date(year, month - 1, '1');
        var last_day = new Date(year, month, 0);
        //fac refresh in caz ca s-a adaugat o luna sau un an nou
        conn.refreshMetadata(month, year, function () {
            conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?)", [first_day, last_day],
                function (err, rows) {
                    //we pass the expenses for the needed month & year + the metadata
                    cb(err, rows, conn.metadata);
                }
            );
        });
    }
};

/**
 * This works for the current month & year - takes the category/type as param.
 * @param {string} categ - the category/type for which we need the expenses
 * @param {function} cb - callback
 */
const getExpensesByCategory = function (categ, cb) {
    getExpensesByMonthAndCategory(conn.metadata.current.selectedMonth,
        conn.metadata.current.selectedYear, categ, function (err, rows) {
            cb(err, rows, conn.metadata);
        });
};

/**
 * 
 * This query is used for the charts in the monthlyView. Basically returns the containts of the view.
 * @param {int} month - the selected month
 * @param {int} lastMonth - selected momnth -1
 * @param {function} cb 
 */
const getTotalExpensesByCategories = function (month, lastMonth, cb) {
    conn.query("SELECT * FROM monthly_categ_bucket where month = ? OR month = ? ORDER BY Month Desc", [month, lastMonth],
        function (err, rows) {
            cb(err, rows);
        }
    );
}

/**
 * This works for the current month & year - takes the bucket as param.
 * @param {string} bucket - the bucket for which we need the expenses
 * @param {function} cb - callback
 */
const getExpensesByBucket = function (bucket, cb) {
    getExpensesByMonthAndBucket(conn.metadata.current.selectedMonth,
        conn.metadata.current.selectedYear, bucket, function (err, rows) {
            cb(err, rows, conn.metadata);
        });
};

/**
 * Self explainatory
 * @param {} id 
 * @param {*} cb 
 */
const deleteExpenseById = function (id, cb) {
    conn.query("DELETE FROM expenses WHERE id = ?", [id], function (err, result) {
        cb(err, result);
    });
};

/**
 * Self explainatory
 * @param {*} expense 
 * @param {*} cb 
 */
const saveExpense = function (expense, cb) {
    conn.query(
        "INSERT INTO expenses (description, name, type, bucket, sum, expense_date) VALUES(?,?,?,?,?,?)",
        [expense.description, expense.name, expense.type, expense.bucket, expense.sum, expense.expense_date],
        function (err, rows) {
            if (err) {
                if (cb) { cb(err) };
            } else {
                if (cb) { cb(err) };
            }
        });
}

/**
 * We can only update the category of an expense. Nothing else is editable.
 * @param {*} field 
 * @param {*} id 
 * @param {*} newCategory 
 * @param {*} cb 
 */
const updateExpenseCategory = function (field, id, newCategory, cb) {
    conn.query("UPDATE expenses SET " + field + " = ? WHERE id = ?",
        [newCategory, id],
        function (err, rows) {
            cb(err, rows);
        });
}

/**
 * Insert the income for a specific month
 * @param {String} month The month for which we insert the income
 * @param {int} sum The income in that month
 * @param {function} cb callback
 */
const insertOrUpdateIncomeInAMonth = function (sum, cb) {
    let month = conn.metadata.current.selectedYear + "-" + conn.metadata.current.selectedMonth;
    conn.query("INSERT INTO monthly_data (month, sum) VALUES (?,?) ON DUPLICATE key UPDATE sum = ?", [month, sum, sum],
        function (err, rows) {
            cb(err, rows);
        }
    );
};

/**
 * Self explainatory
 * @param {*} month 
 * @param {*} year 
 * @param {*} cb 
 */
const getIncomeForMonth = function (month, year, cb) {
    let incomeMonth = year + "-" + (month.length == 2 ? month : "0" + month);
    conn.query("SELECT sum FROM monthly_data WHERE month = ?", [incomeMonth],
        function (err, sum) {
            //we pass the expenses for the needed month & year + the metadata
            cb(err, sum[0]);
        }
    );
}

/**
 * We process the file obtained by exporting the whatsapp group discussion.
 * @param {*} csvData 
 * @param {*} cb 
 */
const importFromFile = function (csvData, cb) {
    var expensesList = processor.processFileContent(csvData);
    var newestMonth, newestYear;
    for (var i in expensesList) {
        saveExpense(expensesList[i]);
        if (i == expensesList.length - 1) {
            newestMonth = expensesList[i].expense_date.getMonth() + 1;;
            newestYear = expensesList[i].expense_date.getFullYear();
        }
    }
    //ma intorc in view-ul lunar cu ultimele cheltuieli logate
    cb(null, newestMonth, newestYear);
};

module.exports = {
    getIncomeForMonth: getIncomeForMonth,
    insertOrUpdateIncomeInAMonth, insertOrUpdateIncomeInAMonth,
    deleteExpenseById: deleteExpenseById,
    createExpense: saveExpense,
    updateExpenseCategory: updateExpenseCategory,
    importFromFile: importFromFile,
    getAllExpenses: getAllExpenses,
    getExpensesByMonth: getExpensesByMonth,
    getExpensesByCategory: getExpensesByCategory,
    getExpensesByBucket: getExpensesByBucket,
    deleteExpenseById: deleteExpenseById,
    getTotalExpensesByCategories: getTotalExpensesByCategories
};

//PRIVATE FUNCTIONS//
/**--------------------------------- */
const getExpensesByMonthAndBucket = function (month, year, bucket, cb) {
    if (!month || !year) { //sunt pe cazul in care vin "default", probabil din alt view
        getExpensesFromNewestMonth(function (err, rows) {
            month = rows[0].month;
            year = rows[0].year;
            var first_day = new Date(year, month - 1, '1');
            //ultima zi a unei luni e cu 0 a lunii urmatoare (mai sus am facut -1 pt luna curenta)
            var last_day = new Date(year, month, 0);
            //fac refresh in caz ca s-a adaugat o luna sau un an nou
            conn.refreshMetadata(month, year, function () {
                conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?) AND bucket=?", [first_day, last_day, bucket],
                    function (err, rows) {
                        //we pass the expenses for the needed month & year + the metadata
                        cb(err, rows, conn.metadata);
                    }
                );
            });
        });
    } else { //sunt pe cazul in care vin cu luna+an selectate de la comboboxes
        var first_day = new Date(year, month - 1, '1');
        var last_day = new Date(year, month, 0);
        //fac refresh in caz ca s-a adaugat o luna sau un an nou
        conn.refreshMetadata(month, year, function () {
            conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?) AND bucket=?", [first_day, last_day, bucket],
                function (err, rows) {
                    //we pass the expenses for the needed month & year + the metadata
                    cb(err, rows, conn.metadata);
                }
            );
        });
    }
};


const getExpensesByMonthAndCategory = function (month, year, categ, cb) {
    if (!month || !year) { //sunt pe cazul in care vin "default", probabil din alt view
        getExpensesFromNewestMonth(function (err, rows) {
            month = rows[0].month;
            year = rows[0].year;
            var first_day = new Date(year, month - 1, '1');
            //ultima zi a unei luni e cu 0 a lunii urmatoare (mai sus am facut -1 pt luna curenta)
            var last_day = new Date(year, month, 0);
            //fac refresh in caz ca s-a adaugat o luna sau un an nou
            conn.refreshMetadata(month, year, function () {
                conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?) AND type=?", [first_day, last_day, categ],
                    function (err, rows) {
                        //we pass the expenses for the needed month & year + the metadata
                        cb(err, rows, conn.metadata);
                    }
                );
            });
        });
    } else { //sunt pe cazul in care vin cu luna+an selectate de la comboboxes
        var first_day = new Date(year, month - 1, '1');
        var last_day = new Date(year, month, 0);
        //fac refresh in caz ca s-a adaugat o luna sau un an nou
        conn.refreshMetadata(month, year, function () {
            conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?) AND type=?", [first_day, last_day, categ],
                function (err, rows) {
                    //we pass the expenses for the needed month & year + the metadata
                    cb(err, rows, conn.metadata);
                }
            );
        });
    }
};

/**
 * Functia asta ma ajuta cand vin pe view fara un request pentru luna+an. 
 * Atunci vreau sa fac display la cele mai proaspete cheltuieli (luna+an cele mai mari)
 * @param {function} cb 
 */
const getExpensesFromNewestMonth = function (cb) {
    conn.query("select MONTH(MAX(expense_date)) as month, YEAR(MAX(expense_date)) as year from expenses",
        function (err, rows) {
            cb(err, rows);
        }
    );
}