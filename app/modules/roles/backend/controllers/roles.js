"use strict";

let moduleName = 'roles',
    layer = 'backend',
    _module = new __viewRender(layer, moduleName),
    slug = require('slug');

_module.list = function (req, res) {

    let structure = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'role_name',
            width: '25%',
            header: 'Tên nhóm quyền'
        }, {
            column: 'created_by',
            width: '15%',
            header: 'Người tạo'
        }, {
            column: 'created_date',
            width: '15%',
            header: 'Ngày tạo',
            type: 'date-range',
            buttonClass: 'fa fa-calendar'
        }, {
            column: 'status',
            width: '15%',
            header: 'Trạng thái'
        }
    ];

    /**
     * Toolbar call and render element
     * Access authentication call isAllow for check permission
     */
    let toolbar = new __.Toolbar();
    toolbar.custom({
        createButton: {access: true, link: `/${__config.admin_prefix}/${moduleName}/create`},
        refreshButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        searchButton: {},
        deleteButton: {access: true} // isAllow
    });
    res.locals.tableColumns = structure;

    __models.objects.find({_key: 'roles'})
        .populate('created_by', 'fullname')
        .exec(function (err, results) {
            if (err) {
                __.logger.error(err);
                return _module.render_error(req, res, '500');
            }
            _module.render(req, res, 'index', {
                title: 'Quản lý phân quyền',
                roles: results,
                toolbar: toolbar.render()
            });
        });
};


_module.view = function (req, res) {

    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        saveButton: {access: true}
    });

    var listModuleExtends = {};
    __.getGlobbedFiles(__base + `app/modules/*/module.js`).forEach(function (path) {
        require(path)(listModuleExtends);
    });

    let modules = [];

    for (let md in listModuleExtends) {
        if (listModuleExtends.hasOwnProperty(md)) {
            if (listModuleExtends[md].roles) {
                modules.push(listModuleExtends[md]);
            }
        }
    }

    __models.objects.find({_key: 'roles', _id: req.params.id}).exec(function (err, re) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        }
        _module.render(req, res, 'view', {
            title: 'Danh sách quyền',
            toolbar: toolbar.render(),
            modules: modules,
            acl: re[0]
        });
    });

};

_module.create = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        saveButton: {access: true}
    });

    var listModuleExtends = {};
    __.getGlobbedFiles(__base + `app/modules/*/module.js`).forEach(function (path) {
        require(path)(listModuleExtends);
    });

    let modules = [];

    for (let md in listModuleExtends) {
        if (listModuleExtends.hasOwnProperty(md)) {
            if (listModuleExtends[md].roles) {
                modules.push(listModuleExtends[md]);
            }
        }
    }

    _module.render(req, res, 'view', {
        title: 'Tạo nhóm quyền mới',
        toolbar: toolbar.render(),
        modules: modules
    })
};

_module.created = function (req, res) {
    let acl = [];
    Object.keys(req.body).forEach(function (i) {
        if (i !== 'title' && i !== 'status') {
            acl.push(i);
        }
    });

    let newRole = new __models.objects({
        _key: 'roles',
        name: req.body.title.trim(),
        status: req.body.status.trim(),
        permissions: JSON.stringify(acl),
        created_by: req.user._id
    });

    newRole.save(function (err) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        } else {
            req.flash('success', `Nhóm quyền <b>${req.body.title.trim()}</b> đã được khởi tạo.`);
            res.redirect(`/${__config.admin_prefix}/${moduleName}`);
        }
    });

};

_module.updated = function (req, res) {
    let acl = [];
    Object.keys(req.body).forEach(function (i) {
        if (i !== 'title' && i !== 'status') {
            acl.push(i);
        }
    });

    __models.objects.findByIdAndUpdate(req.params.id, {
        name: req.body.title.trim(),
        status: req.body.status.trim(),
        permissions: JSON.stringify(acl)
    }).exec(function (err, re) {
        if (err) {
            __.logger.error(err);
            return _module.render_error(req, res, '500');
        } else {
            req.flash('success', 'Cập nhật quyền thành công!!');
            res.redirect(`/${__config.admin_prefix}/${moduleName}`);
        }
    });
};


module.exports = _module;