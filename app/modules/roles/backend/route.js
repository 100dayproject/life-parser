"use strict";

let express = require('express');
let router = express.Router();
let roles = require('./controllers/roles');

router.route('/roles').get(__.isAllow('list_roles'), roles.list);
router.route('/roles/create').get(__.isAllow('create_role'), roles.create).post(__.isAllow('create_role'), roles.created);
router.route('/roles/view/:id').get(__.isAllow('list_roles'), roles.view).post(__.isAllow('update_role'), roles.updated);

module.exports = router;