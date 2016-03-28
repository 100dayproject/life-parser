"use strict";

let layer = 'backend',
    moduleName = 'configuration',
    _module = new __viewRender(layer, moduleName);

_module.writeReport = function (req, res) {
    _module.render(req, res, 'writeReport', {
        title: 'Báo cáo hệ thống'
    })
};

_module.protectSystem = function (req, res) {

    __redis.get(__config.redis.prefix_config.name + __config.redis.prefix_config.systemProtected, function (err, re) {
        if (err) {
            __.logger.error(err);
            _module.render_error(req, res, '500');
        }
        if (re == '0') {
            __redis.set(__config.redis.prefix_config.name + __config.redis.prefix_config.systemProtected, -1);
            req.flash('success', 'Đã thực hiện mở khóa hệ thống');
            res.redirect(`/${__config.admin_prefix}/dashboard`);
        } else {
            __redis.set(__config.redis.prefix_config.name + __config.redis.prefix_config.systemProtected, 0);
            req.flash('danger', 'Hệ thống đã được khóa');
            res.redirect(`/${__config.admin_prefix}/dashboard`);
        }
    });
};

_module.siteConfig = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/site/settings`},
        saveButton: {access: true, link: `#`, text: ' Lưu lại'}
    });
    _module.render(req, res, 'siteConfig', {
        title: 'Cấu hình website',
        toolbar: toolbar.render()
    })
};

_module.listModule = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/modules/settings`},
        createButton: {access: true, link: `#`, text: ' Import module'}
    });

    let moduleIgnore = '' || '*';
    let listModuleExtends = {};
    __.getGlobbedFiles(__base + `app/modules/${moduleIgnore}/module.js`).forEach(function (path) {
        require(path)(listModuleExtends);
    });

    _module.render(req, res, 'list_module', {
        title: 'Cài đặt modules',
        toolbar: toolbar.render(),
        modules: listModuleExtends
    })

};

module.exports = _module;