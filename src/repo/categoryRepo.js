const processor = require('../utils/processor');
const conn = require("../services/db");


const getAllExpensesByCategoryAndBucket = function (cb) {
    conn.query("SELECT * FROM monthly_categ_bucket", [],
        function (err, rows) {
            cb(err, rows);
        }
    );
};

module.exports = {
    getAllExpensesByCategoryAndBucket: getAllExpensesByCategoryAndBucket
};