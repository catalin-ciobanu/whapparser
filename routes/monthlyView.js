var express = require('express');
var router = express.Router();

// Require controller modules.
var monthly_view_controller = require('../controllers/monthlyViewController');

/// monthly view ROUTES ///

// GET list all expenses in this/last month
router.get('/', monthly_view_controller.expenses_list_by_month);

// POST list of expenses from a given month
router.post('/monthly/:id',monthly_view_controller.expenses_list_by_month);

// POST request to delete expense.
router.post('/monthly/:id/delete', monthly_view_controller.expense_delete_post);

// POST request to update expense.
router.post('/monthly/:id/update', monthly_view_controller.expense_update_post);

// POST load last month from whatsapp generated file
router.post('/monthly/load_file', monthly_view_controller.load_monthly_expenses_post);

module.exports = router;