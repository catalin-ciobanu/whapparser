var express = require('express');
var router = express.Router();

// Require controller modules.
var monthly_view_controller = require('../controllers/monthlyViewController');

/// monthly view ROUTES ///

// GET list all expenses in this/last month
router.get('/', monthly_view_controller.expenses_list_by_month);

router.get('/getChartData', monthly_view_controller.chart_data);


// POST list all expenses in this/last month
router.post('/', monthly_view_controller.expenses_list_by_month);

//POST which handles uploading new expenses from a file
router.post("/load_file", monthly_view_controller.load_monthly_expenses_post);

//POST which handles insertion or update of income for a month
router.post("/insert_or_update_income", monthly_view_controller.insert_or_update_income_in_month);

// GET list of expenses from a given category
router.get('/category/:id',monthly_view_controller.expenses_list_by_category);

// GET list of expenses from a given bucket
router.get('/bucket/:id',monthly_view_controller.expenses_list_by_bucket);

// POST request to delete expense.
router.post('/monthly/:id/delete', monthly_view_controller.expense_delete_post);

// POST request to update expense.
router.post('/monthly/:id/update', monthly_view_controller.expense_update_post);

// POST load last month from whatsapp generated file
router.post('/monthlyView/load_file', monthly_view_controller.load_monthly_expenses_post);

module.exports = router;