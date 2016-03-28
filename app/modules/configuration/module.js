"use strict";

module.exports = function (module) {
    let titleProtect = 'Khóa hệ thống',
        iconProtect = 'fa fa-unlock';

    __redis.get(__config.redis.prefix_config.name + __config.redis.prefix_config.systemProtected, function (err, re) {
        if (err) __.logger.error(err);

        // Nếu hệ thống đang khóa
        if (re == '0') {
            titleProtect = 'Mở khóa hệ thống';
            iconProtect = 'fa fa-lock'
        }
    });

    module.configuration = {
        title: 'Cấu hình hệ thống',
        author: 'Hai',
        version: '0.0.1',
        system: true,
        description: 'Cấu hình hệ thống, cấu hình module, sắp xếp module.',
        group: 0,
        backend_menu: {
            title: 'Cấu hình hệ thống',
            icon: 'fa fa-cog',
            menu: [
                {
                    title: 'Cấu hình website',
                    link: `/${__config.admin_prefix}/site/settings`,
                    ref: 'site_settings'
                }, {
                    title: 'Thiết lập SEO',
                    link: `/${__config.admin_prefix}/SEO/settings`,
                    ref: 'seo_plugin_setting'
                }, {
                    title: 'Cài đặt modules',
                    link: `/${__config.admin_prefix}/modules/settings`,
                    ref: 'install_module'
                }
            ]
        }, roles: [
            {
                name: 'site_settings',
                title: 'Site Settings'
            }, {
                name: 'seo_plugin_setting',
                title: 'SEO Plugin Setting'
            }, {
                name: 'install_module',
                title: 'Install Module'
            }
        ]
    };

    module.protectSystem = {
        title: titleProtect,
        author: 'Hai',
        version: '0.0.1',
        system: true,
        description: 'Khóa hệ thống, khắc phục lỗi khi phát hiện vấn đề hoặc tấn công.',
        group: 0,
        backend_menu: {
            title: titleProtect,
            icon: iconProtect,
            link: `/${__config.admin_prefix}/protectSystem`,
            ref: 'lock_website'
        }, roles: [
            {
                name: 'lock_website',
                title: 'Lock website'
            }
        ]
    };

    module.reportSystem = {
        title: 'Báo cáo hệ thống',
        author: 'Hai',
        version: '0.0.1',
        system: true,
        description: 'Tiếp nhận ý kiến của người dùng cho hệ thống (lỗi hệ thống, nâng cấp tính năng, UI/UX ..)',
        group: 0,
        backend_menu: {
            title: 'Báo cáo hệ thống',
            icon: 'fa fa-bug',
            menu: [
                {
                    title: 'Báo lỗi',
                    link: `/${__config.admin_prefix}/report/bugs`,
                    ref: 'report_system'
                },
                {
                    title: 'Yêu cầu chức năng',
                    link: `/${__config.admin_prefix}/report/featureRequest`,
                    ref: 'feature_request'
                }, {
                    title: 'Kiểm soát lỗi',
                    link: `/${__config.admin_prefix}/report/logs`,
                    ref: 'bug_control'
                }
            ]
        }, roles: [
            {
                name: 'report_system',
                title: 'Báo lỗi hệ thống'
            }, {
                name: 'feature_request',
                title: 'Yêu cầu chức năng'
            }, {
                name: 'bug_control',
                title: 'Quản lý lỗi'
            }
        ]
    };
    return module;
};