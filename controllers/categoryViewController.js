const async = require('async');
const { body, validationResult } = require("express-validator");
const csvtojson = require("csvtojson");
const categoryRepo = require('../src/repo/categoryRepo');


// Display list of all Expenses in that month.
exports.expenses_list_by_category_bucket = (req, res) => {
  categoryRepo.getAllExpensesByCategoryAndBucket(function (err, list_expenses, meta) {
    if (err) {
      res.render('error', { error: err });
      //return next(err); 
    }
    //set the URL so we know where we are - this will allow further filtering for current month
    res.locals.path = req.originalUrl;
    //trimit titlul, lista de cheltuieli dar si metadata
    res.render('categoryView', {
      title: 'Expenses list for categories and bucket', expense_list: list_expenses
    });
  });
};