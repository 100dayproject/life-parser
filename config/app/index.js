/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */


"use strict";

module.exports = {
    app: {
        name: 'Udoctor',
        copyright: '100dayProject.org',
        favicon: "/partial/favicon.ico",
        logo: "AA.png",
        title: "Life-Parser - Open source hasOwn by 100dayProject.org",
        description: "LifeParser | Technical | Technology | Electronic | Open source hasOwn by 100dayproject.org",
        keywords: "LifeParser, Technical technology, Open source, 100dayproject, 100dayproject.org",
        language: "vi_VN"
    },
    env: {
        development: "development",
        production: "production",
        test: "test"
    },
    admin_prefix: "admin",
    site: {
        port: process.env.PORT || 1337,
        templateEngine: 'nunjucks',
        theme: {
            name: "bootstrap", //* path and theme name common for multiple layer
            path: "themes"
        },
        password403: 'haideptrai'
    },
    appLayer: {
        frontend: {
            pathView: 'views',

            /**
             * Render_manager use array[0] for loader path error 404, 500 and more.
             * You can fix fix it but note the caption up.
             * Ex: backend.loader[0]
             */
            loader: [
                "themes/frontend/",
                "app/modules/"
            ]
        },
        backend: {
            pathView: 'views',
            loader: [
                "themes/backend/",
                "app/modules/"
            ]
        }
    }
};
