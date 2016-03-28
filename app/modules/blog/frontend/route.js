"use strict";

let blog = require('./controllers/blog');

module.exports = function (app) {
    app.route('/blog').get(blog.index);
};