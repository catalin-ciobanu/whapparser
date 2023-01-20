const async = require('async');
const { body, validationResult } = require("express-validator");
const csvtojson = require("csvtojson");
const processor = require('../src/utils/processor');
const expenseRepo = require('../src/repo/expenseRepo');


// Display list of all Expenses.
exports.expenses_list = (req, res) => {
  expenseRepo.getAllExpenses(function (err, list_expenses) {
    if (err) {
      res.render('error', { error: err });
    }
    res.render('expenses', { title: 'Expenses List', expense_list: list_expenses });
  });
};

exports.expenses_list_by_month = (req, res) => {
  expenseRepo.getExpensesByMonth(req.body.month, req.body.year, function (err, list_expenses) {
    if (err) {
      res.render('error', { error: err });
      //return next(err); 
    }
    res.render('expenses', { title: 'Expenses List', expense_list: list_expenses });
  });
};

exports.expenses_list_by_year = (req, res) => {
  expenseRepo.getExpensesByYear(req.body.year, function (err, list_expenses) {
    if (err) {
      res.render('error', { error: err });
      //return next(err); 
    }
    res.render('expenses', { title: 'Expenses List', expense_list: list_expenses });
  });
};

exports.sum_by_categby_month = (req, res) => {
  expenseRepo.sumAggregate(req.body.category, req.body.month, req.body.year, function (err, sum) {
    if (err) {
      res.render('error', { error: err });
      //return next(err); 
    }

    res.render('expenses', { title: 'Sum for ' + req.body.category, expense_list: sum });
  });
};

// Display expenses under a specific Category.
exports.categ_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
};

// Display expenses under a specific Type.
exports.type_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Type detail: ${req.params.id}`);
};

// Display overall report like in the spreadsheet.
exports.overall_report = (req, res) => {
  res.send(`NOT IMPLEMENTED: Type detail: ${req.params.id}`);
};

// Display Expense create form on GET.
exports.expense_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Expense create GET');
};

// Handle Expense create on POST.
exports.expense_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Expense create POST');
};

// Display Expense delete form on GET.
exports.expense_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Expense delete GET');
};

// Handle Expense delete on POST.
exports.expense_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Expense delete POST');
};

// Display Expense update form on GET.
exports.expense_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Expense update GET');
};

// Handle Expense update on POST.
exports.expense_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Expense update POST');
};

// Handle Expense update on POST.
exports.expense_clear_get = (req, res) => {
  expenseRepo.deleteAllExpenses(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });

};

// Upload the file generated by whatsapp
exports.load_expenses_post = (req, res) => {
  var csvData = req.files.filename.data.toString('utf8');
  expenseRepo.importFromFile(csvData, function (err, month, year) {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.redirect('/monthlyView', 200, { "month": month, "year": year });
    }
  });
}

exports.send_to_dashboard = (req, res) => {
  res.render('dashboard', { title: "Dashboard here" });
};

exports.send_to_monthly = (req, res) => {
  res.render('monthlyView', { title: "Monthly view here" });
};

exports.send_to_reports = (req, res) => {
  res.render('reports', { title: "Reports here" });
};

