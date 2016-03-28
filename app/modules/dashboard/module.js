"use strict";

module.exports = function (module) {
    module.home = {
        title: 'Dashboard',
        author: 'Hai',
        version: '0.0.1',
        system: true,
        description: 'Dashboard',
        group: 1,
        backend_menu: {
            title: 'Dashboard',
            icon: 'fa fa-dashboard',
            link: `/${__config.admin_prefix}/dashboard`,
            ref: 'view_dashboard'
        }, roles: [
            {
                name: 'view_dashboard',
                title: 'Xem Dashboard'
            }
        ]
    };
    return module;
};