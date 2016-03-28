"use strict";

let express = require('express');
let router = express.Router();
let configuration = require('./controllers/config');

router.route('/modules/settings').get(__.isAllow('site_settings'), configuration.listModule);
router.route('/site/settings').get(__.isAllow('site_settings'), configuration.siteConfig);
router.route('/protectSystem').get(__.isAllow('lock_website'), configuration.protectSystem);
router.route('/writeReport').get(__.isAllow('report_system'), configuration.writeReport);

module.exports = router;