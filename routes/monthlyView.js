var express = require('express');
var router = express.Router();

// Require controller modules.
var monthly_view_controller = require('../controllers/monthlyViewController');

/// monthly view ROUTES ///

// GET list all expenses in this/last month
router.get('/', monthly_view_controller.expenses_list_by_month);

// POST list all expenses in this/last month
router.post('/', monthly_view_controller.expenses_list_by_month);

// GET list of expenses from a given category
router.get('/category/:id', monthly_view_controller.expenses_list_by_category);

// GET list of expenses from a given bucket
router.get('/bucket/:id', monthly_view_controller.expenses_list_by_bucket);

//AJAX to update category or bucket
router.post('/updateCategoryBucket', monthly_view_controller.update_category_or_bucket);

//AJAX to delete an expense
router.post('/deleteExpense', monthly_view_controller.delete_expense);

//AJAX load data for the charts
router.get('/getChartData', monthly_view_controller.chart_data);

//POST which handles uploading new expenses from a file
router.post("/load_file", monthly_view_controller.load_monthly_expenses_post);

//POST which handles insertion or update of income for a month
router.post("/insert_or_update_income", monthly_view_controller.insert_or_update_income_in_month);


module.exports = router;