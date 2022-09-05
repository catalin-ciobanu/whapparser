const async = require('async');
const expenseRepo = require('./expenseRepo');
const Expense = require('../../models/expense');

// async function ll (cb) {
//     const response = await Expense.aggregate().group({ _id: '$sum', maxSum: { $max: '$sum' } }).
//         match({}).
//         exec(function (err, bookinstance) {
//             if (err) {
//                 return next(err);
//             }
//             if (bookinstance == null) { // No results.
//                 const err = new Error('Book copy not found');
//                 err.status = 404;
//                 return next(err);
//             }
//             console.log(bookinstance);
//             cb(book);
//         });

// };
// const t = x(function (err, resp) {
//     console.log("");
// });



var t = expenseRepo.getSumByCategoryByMonth('Sanatate', 02, 2022, function (err, res) {
    console.log(JSON.stringify(res));
});
// db.expenseschemas.aggregate([{ $match: { "expense_date": { $gte: 'ISODate("2021-01-01T00:00:00.0Z")', $lte: ISODate("2021-01-31T00:00:00.0Z") } } }, { $group: { _id: "$type", total: { $sum: "$sum" } } }]);
// db.expenseschemas.aggregate([{ $match: { "expense_date": { $eq: new Date("2021-03-04T22:00:00Z")} } }, { $group: { _id: "$type", total: { $sum: "$sum" } } }]);
// db.expenseschemas.aggregate([{$match: {"type":{$gte: 500,$lte: 1000}}},{ $group: { _id: "$type", total: { $sum: "$sum" } } }]);