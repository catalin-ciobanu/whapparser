var express = require('express');
var router = express.Router();

// Require controller modules.
var category_view_controller = require('../controllers/categoryViewController');

/// monthly view ROUTES ///

// GET expenses for each and every category and bucket
router.get('/', category_view_controller.expenses_list_by_category_bucket);

module.exports = router;