const async = require('async');
const { body, validationResult } = require("express-validator");
const csvtojson = require("csvtojson");
const processor = require('../src/utils/processor');
const monthlyRepo = require('../src/repo/expenseRepo');

/** Show two tables 1. Category 2. Bucket
 * - Monthly sum by category and bucket
 * - Yearly (YTD) sum by category and bucket
 */

// Display list of all Expenses in that month.
exports.get_report_monthly_and_yearly = (req, res) => {
  // monthlyRepo.getExpensesByMonth(req.body.month, req.body.year, function (err, list_expenses) {
  //   if (err) { 
  //     res.render('error', {error: err});
  //     //return next(err); 
  //   }
  //   res.render('expenses', { title: 'Expenses List', expense_list: list_expenses });
  // });
  res.render('reports', { title: "This is Reports" });

};