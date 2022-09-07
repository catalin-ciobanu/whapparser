var express = require('express');
var router = express.Router();

// Require controller modules.
var expense_controller = require('../controllers/expenseController');

/// expense ROUTES ///

// GET list all expenses
router.get('/', expense_controller.expenses_list);

//POST list of expenses from a given month
router.post('/listByMonth',expense_controller.expenses_list_by_month);

//POST list of expenses from a given month
router.post('/listByYear',expense_controller.expenses_list_by_year);

//POST sum for a category for a month
router.post('/sumByCategoryByMonth', expense_controller.sum_by_categby_month);

// GET request for creating expense. NOTE This must come before route for id (i.e. display expense).
router.get('/create', expense_controller.expense_create_get);

// POST request for creating expense.
router.post('/create', expense_controller.expense_create_post);

// GET request to delete expense.
router.get('/:id/delete', expense_controller.expense_delete_get);

// POST request to delete expense.
router.post('/:id/delete', expense_controller.expense_delete_post);

// GET request to update expense.
router.get('/:id/update', expense_controller.expense_update_get);

// POST request to update expense.
router.post('/:id/update', expense_controller.expense_update_post);

// POST load whatsapp generated file
router.post('/load_file', expense_controller.load_expenses_post);

// GET delete all records
router.get('/deleteAll', expense_controller.expense_clear_get);

router.get('/dashboard', expense_controller.send_to_dashboard);

router.get('/monthly', expense_controller.send_to_monthly);

router.get('/reports', expense_controller.send_to_reports);

module.exports = router;