/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let chalk = require('chalk'),
    glob = require('glob');

module.exports = function () {
    /**
     * Before we begin, lets set the environment variable
     * We'll Look for a valid NODE_ENV variable and if one cannot be found load the development NODE_ENV
     */
    let envFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
    if (!envFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red(`\nNo configuration file found for ${process.env.NODE_ENV} environment using development instead.\n`));
        } else {
            console.error(chalk.red(`\nNODE_ENV is not defined! Using default product environment.\n`));
        }
        process.env.NODE_ENV = 'production';
    } else {
        console.log(chalk.bold.green(`\nApplication loaded using the ${process.env.NODE_ENV} environment configuration.\n`));
    }
};