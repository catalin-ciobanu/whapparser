const processor = require('../utils/processor');
const conn = require("../services/db");


const getAllExpensesByCategoryAndBucket = function (cb) {
    conn.query("SELECT * FROM monthly_categ_bucket a JOIN monthly_data b ON a.month = b.month ORDER BY a.Month Desc", [],
        function (err, rows) {
            cb(err, rows);
        });
};

const getAllCategoriesAndBuckets = function (cb) {
    conn.query("SELECT DISTINCT 'category' AS 'type', type AS value FROM expenses UNION SELECT DISTINCT 'bucket' AS 'type', bucket AS value FROM expenses;", [],
        function (err, rows) {
            cb(err, rows);
        });
};

module.exports = {
    getAllExpensesByCategoryAndBucket: getAllExpensesByCategoryAndBucket,
    getAllCategoriesAndBuckets: getAllCategoriesAndBuckets
};