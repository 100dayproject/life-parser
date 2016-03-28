/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

function menuGenerator(listModules, menu) {
    let content = '';
    let node = listModules[menu].backend_menu;
    if (node.menu) {
        let child = '';

        for (let i in node.menu) {
            if (node.menu.hasOwnProperty(i)) {
                child += `<li><a class="link-active" href="${node.menu[i].link}"><i class="${node.menu[i].icon || 'fa fa-circle-o'}"></i>${node.menu[i].title}</a></li>`
            }
        }

        content += `<li class="treeview">
        <a href="#"><i class="${node.icon}"></i> <span>${node.title}</span> <i
                  class="fa fa-angle-left pull-right"></i></a>
        <ul class="treeview-menu">
            ${child}
        </ul>
      </li>`
    } else {
        content += `<li><a href="${node.link}"><i class="${node.icon}"></i> <span>${node.title}</span></a></li>`
    }
    return content;
}

let listModuleExtends = {};
module.exports = function (env) {
    env.addFilter('get_menu', function (groupName) {
            __redis.get(__config.redis.prefix_menu, function (err, re) {
                if (err) {
                    __.logger.error(err);
                } else {
                    return env.getFilter('safe')(re);
                }
            });

            let system = '',
                unknown = '';
            let listGroup = groupName.split(',');
            //!(blog)
            let moduleIgnore = '' || '*';
            __.getGlobbedFiles(__base + `app/modules/${moduleIgnore}/module.js`).forEach(function (path) {
                require(path)(listModuleExtends);
            });
            for (let menu in listModuleExtends) {
                if (listModuleExtends.hasOwnProperty(menu)) {

                    // Modules has group and group name not equals 0
                    if (listModuleExtends[menu].group === 1) {
                        if (listGroup[0].indexOf('header') < 0)
                            listGroup[0] = `<li class="header">${listGroup[0]}</li>`;

                        listGroup[0] += menuGenerator(listModuleExtends, menu);
                    } else if (listModuleExtends[menu].group === 2) {
                        if (listGroup[1].indexOf('header') < 0)
                            listGroup[1] = `<li class="header">${listGroup[1]}</li>`;

                        listGroup[1] += menuGenerator(listModuleExtends, menu);
                    } else if (listModuleExtends[menu].group === 3) {
                        if (listGroup[2].indexOf('header') < 0)
                            listGroup[2] = `<li class="header">${listGroup[2]}</li>`;

                        listGroup[2] += menuGenerator(listModuleExtends, menu);
                    } else if (listModuleExtends[menu].group === 0) {
                        if (!system) {
                            system += `<li class="header">Hệ thống</li>`;
                        }
                        system += menuGenerator(listModuleExtends, menu);
                    } else {
                        // Unknown group name
                        if (!unknown) {
                            unknown += `<li class="header">Unknown</li>`;
                        }
                        unknown += menuGenerator(listModuleExtends, menu);
                    }
                }
            }

            let content = listGroup[0] + listGroup[1] + listGroup[2] + system + unknown;

            __redis.set(__config.redis.prefix_menu, content);

            return env.getFilter('safe')(content);
        }
    )
};