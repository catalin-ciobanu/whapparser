var express = require('express');
var router = express.Router();

// Require controller modules.
var dashboard_controller = require('../controllers/dashboardController');

/// dashboard ROUTES ///

// GET data for the charts
router.get('/dashboard', dashboard_controller.get_dashboard_data);
module.exports = router;