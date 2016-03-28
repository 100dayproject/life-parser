"use strict";

module.exports = function (module) {
    module.roles = {
        title: 'Roles',
        author: 'Hai Nho',
        version: '0.0.1',
        system: false,
        description: 'Quản lý các nhóm quyền của hệ thống',
        group: 0,
        backend_menu: {
            title: 'Quản lý phân quyền',
            icon: 'fa fa-users',
            menu: [
                {
                    title: 'Danh sách quyền',
                    link: `/${__config.admin_prefix}/roles`,
                    ref: 'list_roles'
                }, {
                    title: 'Tạo quyền mới',
                    link: `/${__config.admin_prefix}/roles/create`,
                    ref: 'create_role'
                }
            ]
        }, roles: [
            {
                name: 'list_roles',
                title: 'List Roles'
            }, {
                name: 'update_role',
                title: 'Update role'
            }, {
                name: 'create_role',
                title: 'Create New Role'
            }
        ]
    };
    return module;
};