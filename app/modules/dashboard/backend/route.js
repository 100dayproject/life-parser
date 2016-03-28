"use strict";

let express = require('express');
let router = express.Router();
let dashboard = require('./controllers/dashboard');

router.route('/dashboard').get(dashboard.index);
router.route('/dashboard/countQuestionPendingVIP').get(dashboard.countQuestionPendingVIP);

module.exports = router;