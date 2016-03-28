"use strict";

let home = require('./controllers/home');

module.exports = function (app) {
    app.route('/').get(home.index);
};