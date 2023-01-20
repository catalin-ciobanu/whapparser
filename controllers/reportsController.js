const async = require('async');
const { body, validationResult } = require("express-validator");
const csvtojson = require("csvtojson");
const processor = require('../src/utils/processor');
const monthlyRepo = require('../src/repo/expenseRepo');

// Display list of all Expenses in that month.
exports.get_report_monthly_and_yearly = (req, res) => {
  res.render('reports', { title: "This is Reports" });
};