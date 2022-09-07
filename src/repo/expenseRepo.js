const processor = require('../utils/processor');
const conn = require("../services/db");

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
    cb(null, newestMonth, newestYear);
};

const getAllExpenses = function (cb) {
    conn.query("SELECT * FROM expenses", [],
        function (err, rows) {
            cb(err, rows);
        }
    );
};

const getExpensesByMonth = function (month, year, cb) {
    month = month ? month : new Date().getMonth() + 1;
    year = year ? year : new Date().getFullYear();
    var first_day = new Date(year, month - 1, '1');
    var last_day = new Date(year, month, 0);
    console.log("first day: " + first_day + "last day: " + last_day);
    conn.query("SELECT * FROM expenses WHERE (expense_date BETWEEN ? AND ?)", [first_day, last_day],
        function (err, rows) {
            cb(err, rows);
        }
    );
};

const getExpensesByYear = function (year, cb) {
    var last_day = new Date(year, '12', 0);
    var first_day = new Date(year, '0', '1')
    return Expense.find({
        "expense_date":
        {
            $gte: first_day,
            $lte: last_day
        }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const getExpensesByCategory = function (categ, cb) {
    console.log("Filtering by: " + categ);
    return Expense.find({
        "type":
        {
            $eq: categ
        }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const getExpensesByCategoryByMonth = function (categ, month, year, cb) {
    console.log("Filtering by: " + categ + ", " + month + ", " + year);
    var last_day = new Date(year, month, 0);
    var first_day = new Date(year, month - 1, '1')
    console.log("first day: " + first_day + "laat day: " + last_day);
    return Expense.find({
        "expense_date":
        {
            $gte: first_day,
            $lte: last_day
        },
        "type": { $eq: categ }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const getExpensesByCategoryByYear = function (categ, year) {
    console.log("Filtering by: " + categ + ", " + year);
    var last_day = new Date(year, '12', 0);
    var first_day = new Date(year, '0', '1')
    return Expense.find({
        "expense_date":
        {
            $gte: first_day,
            $lte: last_day
        },
        "type": { $eq: categ }
    })
        .sort({ expense_date: 1 })
        .exec(cb);

};

const getExpensesByBucket = function (bucket, cb) {
    console.log("Filtering by: " + bucket);
    return Expense.find({
        "bucket": { $eq: bucket }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const getExpensesByBucketByMonth = function (bucket, month, year) {
    console.log("Filtering by: " + bucket + ", " + month + ", " + year);
    var last_day = new Date(year, month, 0);
    var first_day = new Date(year, month - 1, '1')
    console.log("first day: " + first_day + "last day: " + last_day);
    return Expense.find({
        "expense_date":
        {
            $gte: first_day,
            $lte: last_day
        },
        "bucket": { $eq: bucket }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const getExpensesByBucketByYear = function (bucket, year) {
    console.log("Filtering by: " + bucket + "," + year);
    var last_day = new Date(year, '12', 0);
    var first_day = new Date(year, '0', '1')
    return Expense.find({
        "expense_date":
        {
            $gte: first_day,
            $lte: last_day
        },
        "bucket": { $eq: bucket }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const getExpensesByName = function (name) {
    console.log("Filtering by: " + name);
    return Expense.find({
        "name": { $eq: name }
    })
        .sort({ expense_date: 1 })
        .exec(cb);
};

const sumAggregate = function (categ, month, year, cb) {
    //console.log("Summing by: " + category + ", " + month + ", " + year);
    //const sum = [1, 2, 3].reduce((partialSum, a) => partialSum + a, 0);

    console.log("Filtering by: " + categ + ", " + month + ", " + year);
    var last_day = new Date(year, month, 0);
    var first_day = new Date(year, month - 1, '1');
    return Expense.aggregate([
        {
            $match: {
                "type":
                {
                    $eq: categ
                }
            }
        }, {
            $group: {
                _id: '$type', sum: { $sum: '$sum' }
            }
        },

        // {
        //     $project: {
        //"type": 1,
        //"sum": 1
        //     }
        // }
    ]).exec(function (err, bookinstance) {
        // console.log(bookinstance);
        cb(err, bookinstance);
    });
};

const getSumByCategoryByMonth = function (categ, month, year, cb) {
    //console.log("Summing by: " + category + ", " + month + ", " + year);
    //const sum = [1, 2, 3].reduce((partialSum, a) => partialSum + a, 0);

    console.log("Filtering by: " + categ + ", " + month + ", " + year);
    var last_day = new Date(year, month, 0);
    var first_day = new Date(year, month - 1, '1');
    return Expense.find({
        "expense_date":
        {
            $gte: first_day,
            $lte: last_day
        },
        "type": { $eq: categ }
    }).select({ "sum": 1, "_id": 0 })
        .sort({ expense_date: 1 })
        .exec(cb);

};
const getSumByCategoryByYear = function (category, year) {
    console.log("Summing by: " + category + ", " + year);

};
const getSumByBucketByMonth = function (bucket, month, year) {
    console.log("Summing by: " + month + ", " + bucket + ", " + year);

};
const getSumByBucketByYear = function (bucket, year) {
    console.log("Summing by: " + bucket + "," + year);

};

const getTotalSumYear = function (year) {
    console.log("Total Summing by: " + year);

};

const getTotalSumMonth = function (month, year) {
    console.log("Total Summing by: " + month + year);

};

const deleteAllExpenses = function (cb) {
    conn.query("TRUNCATE expenses", [],
        function (err, rows) {
            if (err) {
                // console.log(err.message);
                cb(err);
            } else {
                //console.log(rows);
                cb();
            }
        });
};

const deleteExpenseById = function (id) {
    const result = conn.query("DELETE FROM expenses WHERE id = ?", [id]);
    let message = 'Error in deleting expense';
    if (result.affectedRows) {
        message = 'Expense deleted successfully';
    }
    return { message };
};

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

const updateExpense = function (id, expense, cb) {
    conn.query("UPDATE expenses SET description = ?, name = ?, type = ?, bucket = ?, sum = ?, expense_date = ? WHERE id = ?",
        [expense.description, expense.name, expense.type, expense.bucket, expense.sum, expense.expense_date, id],
        function (err, rows) {
            if (err) {
                console.log(err.message);
                cb(err);
            } else {
                console.log(rows);
                cb();
            }
        });
}



module.exports = {
    deleteExpenseById: deleteExpenseById,
    createExpense: saveExpense,
    updateExpense: updateExpense,
    sumAggregate: sumAggregate,
    importFromFile: importFromFile,
    getSumByCategoryByMonth: getSumByCategoryByMonth,
    getAllExpenses: getAllExpenses,
    getExpensesByMonth: getExpensesByMonth,
    getExpensesByYear: getExpensesByYear,
    getExpensesByCategory: getExpensesByCategory,
    getExpensesByBucket: getExpensesByBucket,
    getExpensesByName: getExpensesByName,
    deleteAllExpenses: deleteAllExpenses,
    deleteExpenseById: deleteExpenseById
};







// [{$match: {"expense_date": {$gte: first_day,$lte: last_day}}},{$group: {_id: "$type",total: {$sum: "$sum"}}}]