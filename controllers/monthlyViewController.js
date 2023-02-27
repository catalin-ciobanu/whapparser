const async = require('async');
const { body, validationResult } = require("express-validator");
const csvtojson = require("csvtojson");
const processor = require('../src/utils/processor');
const expenseRepo = require('../src/repo/expenseRepo');

/** Show all expenses in a month - start with current/newest month
 * - ability to upload latest expenses (from file)
 * - ability to select a specific month to display
 */

// Display list of all Expenses in that month.
exports.expenses_list_by_month = (req, res) => {
  expenseRepo.getExpensesByMonth(req.body.month, req.body.year, function (err, list_expenses, meta) {
    if (err) {
      res.render('error', { error: err });
    }
    //set the URL so we know where we are - this will allow further filtering for current month
    res.locals.path = req.originalUrl;

    if (meta && meta.current) {
      expenseRepo.getIncomeForMonth(meta.current.selectedMonth, meta.current.selectedYear, function (err, income) {
        if (err) {
          res.render('error', { error: err });
        }
        //trimit titlul, lista de cheltuieli dar si metadata
        res.render('monthlyView', {
          title: 'Expenses for: ' + meta.current.selectedMonth +
            ", " + meta.current.selectedYear
          , expense_list: list_expenses, monthly_income: (income ? income.sum : 0), metadata: meta
        });
      });
    }
  });
};

exports.expenses_list_by_category = (req, res) => {
  expenseRepo.getExpensesByCategory(req.params.id, function (err, list_expenses, meta) {
    if (err) {
      res.render('error', { error: err });
    }
    //set the URL so we know where we are - this will allow further filtering for current month
    res.locals.path = req.originalUrl;
    //trimit titlul, lista de cheltuieli dar si metadata
    res.render('monthlyView', {
      title: "Category: " + req.params.id
      , expense_list: list_expenses, metadata: meta
    });
  });
};

exports.expenses_list_by_bucket = (req, res) => {
  expenseRepo.getExpensesByBucket(req.params.id, function (err, list_expenses, meta) {
    if (err) {
      res.render('error', { error: err });
      //return next(err); 
    }
    //set the URL so we know where we are - this will allow further filtering for current month
    res.locals.path = req.originalUrl;
    //trimit titlul, lista de cheltuieli dar si metadata
    res.render('monthlyView', {
      title: "Bucket: " + req.params.id
      , expense_list: list_expenses, metadata: meta
    });
  });
};

// Upload the file generated by whatsapp
exports.load_monthly_expenses_post = (req, res) => {
  var csvData = req.files.filename.data.toString('utf8');
  expenseRepo.importFromFile(csvData, function () {
    res.redirect('/monthlyView');
  });
};

exports.insert_or_update_income_in_month = (req, res) => {
  expenseRepo.insertOrUpdateIncomeInAMonth(req.body.sum, function () {
    res.redirect('/monthlyView');
  });
}

exports.chart_data = (req, res) => {
  expenseRepo.getTotalExpensesByCategories(req.query.month, req.query.lastMonth, function (err, list_expenses) {
    if (err) {
      res.render('error', { error: err });
      //return next(err); 
    }
    if (list_expenses[0] && list_expenses[1]) {
      let categories_current = Object.keys(list_expenses[0]);
      let totals_current = Object.values(list_expenses[0]);
      let categories_last = Object.keys(list_expenses[1]);
      let totals_last = Object.values(list_expenses[1]);
      let result_current = [], result_last = [], i = 2;//we do not parse the month and the TOTAL which are the first two items in the result
      for (i; i < categories_current.length; i++) {
        if (totals_current[i] > 0) {
          result_current.push({ category: categories_current[i], sum: totals_current[i] });
          result_last.push({ category: categories_last[i], sum: totals_last[i] });
        }
      }
      res.send(JSON.stringify([result_current, result_last]));
    }

  });
}

exports.update_category_or_bucket = (req, res) => {
  expenseRepo.updateExpenseCategory(req.body.field, req.body.id, req.body.value, function (err, rows) {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.redirect('/monthlyView');
    }

  });
}

exports.delete_expense = (req, res) => {
  expenseRepo.deleteExpenseById(req.body.id, function (err, rows) {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.redirect('/monthlyView');
    }
  });
}