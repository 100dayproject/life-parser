/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let pathJoin = require('path').join;

module.exports = function (env) {
    env.addFilter('get_layout', function (name, layer) {
        let theme = __config.site.theme;
        let ext = '.' + __config.viewEngine.nunjucks.settings.ext;

        if (name.indexOf(ext) == -1) name += ext;
        if (name.indexOf('./') == 0) name = name.slice(2);

        let theme_path = pathJoin(__base, theme.path, layer, theme.name, name);

        if (!require('fs').existsSync(theme_path)) {
            return pathJoin(__base, theme.path, '_default', name);
        }
        else {
            return theme_path;
        }
    });
};