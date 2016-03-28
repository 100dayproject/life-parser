/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */


"use strict";
var moment = require('moment-timezone');
var default_timezone = 'Asia/Ho_Chi_Minh';

exports.getFilterId = function (query, field) {
    var index = query.sColumns.split(",").indexOf(field);
    return query["sSearch_" + index];
};

exports.getDateTime = function (time, format) {
    return moment(time).format(format);

};
