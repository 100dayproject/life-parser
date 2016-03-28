"use strict";

module.exports = function (module) {
    module.blog = {
        title: 'Blog',
        author: 'Hai Nho',
        version: '0.0.1',
        system: false,
        description: 'Bài viết',
        group: 1,
        permissions: [
            {
                name: 'post_manage',
                title: 'Quản lý bài viết bản thân'
            }, {
                name: 'post_manage_all',
                title: 'Quản lý tất cả bài viết'
            }
        ],
        backend_menu: {
            title: 'Bài viết',
            icon: 'fa fa-newspaper-o',
            menu: [
                {
                    title: 'Danh sách bài viết',
                    link: `/${__config.admin_prefix}/blog`,
                    icon: 'fa fa-arrows-h',
                    ref: 'list_posts'
                }, {
                    title: 'Viết bài mới',
                    link: `/${__config.admin_prefix}/blog/create`,
                    ref: 'create_post'
                }
            ]
        }, roles: [
            {
                name: 'list_posts',
                title: 'Xem tất cả bài viết'
            }, {
                name: 'delete_post',
                title: 'Xóa bài viết'
            }, {
                name: 'create_post',
                title: 'Tạo mới bài viết'
            }, {
                name: 'update_post',
                title: 'Cập nhật bài viết'
            }
        ]
    };
    return module;
};