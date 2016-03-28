/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let Promise = require('bluebird');

class createTable {
    constructor(modelData, tableStructure, condition, pagination) {
        this.model = modelData;
        this.table = tableStructure;
        this.condition = condition || {};
        this.pagination = pagination || {};
    }

    render(done) {
        let columnSelect = '';
        let populate = {};
        let populateKey = [];
        let options = {};
        let condition = {};
        this.table.forEach(function (item) {

            // Add condition for boolean instance, in this case condition is False
            if (item.condition && (item.condition.default || typeof item.condition.default == 'boolean')) {
                condition[item.column] = item.condition.default;
            }

            if (item.type !== 'action' && !item.options) {
                columnSelect += `${item.column.trim()} `;
                if (item.populate) {
                    populate[item.column] = item.populate.select.trim();
                    populateKey.push(item.column.trim());
                }
            } else {
                if (item.options && item.options.sort) {
                    options.sort = item.options.sort || {};
                }
            }
        });

        for (let cond in condition) {
            if (condition.hasOwnProperty(cond)) {
                this.condition[cond] = condition[cond];
            }
        }

        Promise.all([
            this.model.find(this.condition).count(function (err, total) {
                if (err) {
                    __.logger.error(err);
                    return done(err);
                }
                return total;
            }),
            this.model.find(this.condition).skip(this.pagination.offset).limit(this.pagination.pageSize).sort(options.sort)
                .select(columnSelect.trimRight())
                .populate(populateKey[0] || '', populate[populateKey[0]] || '')
                .populate(populateKey[1] || '', populate[populateKey[1]] || '')
                .populate(populateKey[2] || '', populate[populateKey[2]] || '')
                .populate(populateKey[3] || '', populate[populateKey[3]] || '')
                .exec(function (err, foundTable) {
                    if (err) {
                        __.logger.error(err, 'backend');
                        return done(err);
                    }
                    return foundTable;
                })
        ]).then(function (data) {
            done(null, data);
        }).catch(function (e) {
            done(e);
        })
    }
}

module.exports = createTable;