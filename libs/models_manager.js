/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */


"use strict";

let sep = require('path').sep;

__.logger.info(`Application running used ${__config.db.dialect} database!`);

let db = undefined;
if (__config.db.dialect === 'mongodb') {
    db = require(__base + ['libs', 'db_dialect' + sep].join(sep) + __config.db.dialect);
} else {
    console.log(__base + ['libs', 'db_dialect', 'sequelize'].join(sep));
    db = require(__base + ['libs', 'db_dialect', 'sequelize'].join(sep));
}

module.exports = db;