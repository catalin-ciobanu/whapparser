var express = require('express');
var router = express.Router();

// Require controller modules.
var reports_controller = require('../controllers/reportsController');

/// reports ROUTES ///

// GET list all expenses
router.get('/reports', reports_controller.get_report_monthly_and_yearly);
module.exports = router;