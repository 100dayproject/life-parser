/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

module.exports = function (env) {
    env.addFilter('flash-messages', function (msg) {
        let safe = env.getFilter('safe').html;
        if (msg.info) {
            return safe(html('info', msg.info));
        } else if (msg.success) {
            return safe(html('success', msg.success));
        } else if (msg.error) {
            return safe(html('error', msg.error));
        } else if (msg.warn) {
            return safe(html('warn', msg.warn));
        }
    });
};


function html(key, content) {
    return '<div class="alert alert-"' + key + '" alert-dismissible"> ' +
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> ' +
        '<i class="icon fa fa-{{ icon }}"></i>"' + content + '"</div>';
}