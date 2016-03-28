'use strict';

let _module = new __viewRender('frontend', 'home');

_module.index = function (req, res) {
    //** Make a controllers here */
    _module.render(req, res, 'index', {
        title: 'Page home'
    })
};

module.exports = _module;