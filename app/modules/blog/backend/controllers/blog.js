"use strict";

let moduleName = 'blog',
    layer = 'backend',
    _module = new __viewRender(layer, moduleName),
    Promise = require('bluebird'),
    slug = require('slug');

_module.list = function (req, res) {

    //** Make a controllers here */

    let structure = [
        {
            column: '_id',
            width: '1%',
            header: ''
        }, {
            column: 'title',
            width: '25%',
            header: 'Tiêu đề',
            type: 'select',
            buttonClass: 'fa fa-search',
            condition: {
                type: '/d/'
            }

        }, {
            column: 'alias',
            width: '25%',
            header: 'Alias',
            type: 'text',
            condition: {
                type: '/d/'
            }
        }, {
            column: 'created_by',
            width: '20%',
            header: 'Họ tên',
            type: 'text',
            populate: {
                select: 'fullname'
            },
            condition: {
                type: 'none'
            }
        }, {
            column: 'created_at',
            width: '15%',
            header: 'Ngày đăng',
            type: 'date-range',
            buttonClass: 'fa fa-calendar',
            condition: {
                type: 'none'
            }
        }, {
            column: 'isPublish',
            width: '13%',
            header: 'Trạng thái',
            type: {
                name: 'select',
                values: {
                    true: 'Publish',
                    false: 'Draft'
                }
            },
            condition: {
                type: 'equals'
            }
        },
        {
            options: {
                sort: {created_at: -1}
            }
        }
    ];

    /**
     * Toolbar call and render element
     * Access authentication call isAllow for check permission
     */
    let toolbar = new __.Toolbar();
    toolbar.custom({
        refreshButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        createButton: {access: true, link: `/${__config.admin_prefix}/${moduleName}/create`, text: ' Viết bài mới'},
        searchButton: {},
        deleteButton: {access: true} // isAllow
    });
    res.locals.tableColumns = structure;
    let pageSize = 15;
    let currentPage = req.query.page || 1;

    try {
        var table = new __.createTable(__models.Posts, structure, __.parseQueryCondition([req.query, structure]), __.pagination(currentPage, pageSize));

        table.render(function (err, results) {
            _module.render(req, res, 'index', {
                title: 'Danh sách bài viết',
                posts: results[1],
                totalPage: Math.ceil(results[0] / pageSize),
                currentPage: currentPage,
                toolbar: toolbar.render()
            });
        });
    } catch (e) {
        __.logger.error(e);
        _module.render_error(req, res, '500');
    }

};

_module.create = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        saveButton: {access: true}
    });

    Promise.all([
        __models.Category_Post.find({}).exec(function (err, foundCategory) {
            if (!err) return foundCategory;
        })
    ]).then(function (result) {
        _module.render(req, res, 'view', {
            title: 'Viết bài mới',
            toolbar: toolbar.render(),
            categories: result[0]
        })
    }).catch(function (error) {
        __.logger.error(error);
        _module.render_error(req, res, '500');
    });
};

_module.created = function (req, res) {
    let status = false;
    if (req.body.isPublish == 'true') status = true;
    var newPost = new __models.Posts({
        title: req.body.title,
        alias: req.body.alias || slug(req.body.title),
        intro_text: req.body.intro_text,
        full_text: req.body.content,
        isPublish: status,
        categories: req.body.id_category,
        image: req.body.image,
        created_by: req.user._id
    });

    newPost.save(function (err) {
        if (err) {
            req.flash('danger', 'Có lỗi xảy ra!');
        } else {
            req.flash('success', 'Đăng bài viết thành công!');
            res.redirect(`/${__config.admin_prefix}/${moduleName}`);
        }
    });
};

_module.updated = function (req, res) {
    let id = req.params.id;

    let status = false;
    if (req.body.isPublish == 'true') status = true;
    __models.Posts.update({_id: id}, {
        title: req.body.title,
        alias: req.body.alias || slug(req.body.title),
        intro_text: req.body.intro_text,
        full_text: req.body.content,
        isPublish: status,
        categories: req.body.id_category,
        image: req.body.image
    }).exec(function (err, re) {
        if (err) {
            __.logger.error(err);
            _module.render_error(req, res, '500');
        } else {
            req.flash('success', 'Cập nhật bài viết thành công!');
            res.redirect(`/${__config.admin_prefix}/${moduleName}`);
        }
    })
};

_module.delete = function (req, res) {
    __models.Posts.remove({_id: {$in: req.body.ids}})
        .exec(function (err) {
            if (err) {
                __.logger.error(err);
                req.flash('danger', 'Có lỗi xảy ra!');
                res.sendStatus(200);
            } else {
                req.flash('success', 'Xóa bài viết thành công!');
                res.sendStatus(200);
            }
        })
};

_module.view = function (req, res) {
    let toolbar = new __.Toolbar();
    toolbar.custom({
        backButton: {link: `/${__config.admin_prefix}/${moduleName}`},
        saveButton: {access: true}
    });
    let id = req.params.id;
    __models.Posts.find({_id: id})
        .populate({
            'path': 'categories',
            'select': 'name'
        })
        .exec(function (err, foundPost) {
            if (err) {
                // Wrong parameter req query
                __.logger.error(err);
                return _module.render_error(req, res, '500');
            } else if (!foundPost.length) {
                // Parameter accept but not found
                __.logger.warn(`${layer} > Wrong parameter url: ${res.locals.route}`);
                return _module.render_error(req, res, '404');
            } else {
                __models.Category_Post.find({_id: {$nin: __.filterSelect2(foundPost[0].categories)}}, {name: 1}).exec(function (err, categories) {
                    if (err) {
                        __.logger.error(err);
                        return _module.render_error(req, res, '500');
                    }
                    _module.render(req, res, 'view', {
                        title: foundPost[0].title,
                        toolbar: toolbar.render(),
                        post: foundPost[0],
                        categories: categories
                    })
                });
            }
        });
};

module.exports = _module;