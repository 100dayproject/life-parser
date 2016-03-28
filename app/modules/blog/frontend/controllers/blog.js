"use strict";

let _module = new __viewRender('frontend', 'blog');

_module.index = function (req, res) {

    //** Make a controllers here */

    _module.render(req, res, 'index', {
        title: 'Page blog'
    })
};

module.exports = _module;