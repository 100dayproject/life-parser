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
    env.addFilter('pagination', function (totalPage, currentPage, currentURI) {
        if (currentURI.indexOf('?page=') > 0) {
            currentURI = currentURI.slice(0, currentURI.indexOf('?page='));
        } else {
            currentURI = '';
        }
        let pageView = 10;
        if (__config.site.theme.name === 'bootstrap') {
            if (totalPage <= 1) {
                return ''
            } else {
                let nextPage, previous;
                if (currentPage == 1) {
                    previous = `<li class="previous disabled"><a href="#">«</a></li>`;
                } else {
                    previous = `<li class="previous"><a href="${currentURI}?page=${1}">«</a></li>`;
                }
                var html = `<ul class="pagination pagination-md pull-right">${previous}`;
                var i = 1;
                if (currentPage > pageView) {
                    i = currentPage;
                    html += `<li><a href="${currentURI}?page=${parseInt(currentPage) - pageView}">...</a></li>`;
                }
                for (i; i <= totalPage; i++) {

                    let cls = i == parseInt(currentPage) ? 'class="active"' : '';

                    html += `<li ${cls}><a href="${currentURI}?page=${i}">${i}</a></li>`;

                    if (i === parseInt(currentPage) + pageView) {
                        html += `<li><a href="${currentURI}?page=${i + 1}">...</a></li>`;
                        break;
                    }
                }
                if (currentPage == totalPage) {
                    nextPage = `<li class="next disabled"><a href="#">»</a></li>`;
                } else {
                    nextPage = `<li class="next"><a href="${currentURI}?page=${totalPage}">»</a></li>`;
                }
                html += `${nextPage}</ul>`;
                let safe = env.getFilter('safe');
                return safe(html);
            }
        }
    });
};