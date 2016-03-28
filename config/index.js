/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let _ = require('lodash');
let sortedObject = require('sorted-object');

// Load configurations application and apply ignore pattern name directory
let getConfigInstance = __.getDirectories(__base + 'config', ['env', 'passport', 'express']);

// fucking faster coding happy
module.exports = sortedObject(
    _.extend(
        require(getConfigInstance[0]),
        require(getConfigInstance[1]),
        require(getConfigInstance[2]),
        require('./env/' + process.env.NODE_ENV) || {}
    )
);