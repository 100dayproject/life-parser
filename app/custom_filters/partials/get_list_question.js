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
    env.addFilter('get_list_question', function (questions) {
        __models.Question.find({_id: {$in: questions}}, {question: 1}).exec(function (err, re) {
            if (err) {
                __.logger.error(err);
                return '';
            }
            let lst = '';
            re.forEach(function(i) {
                lst += `<li> <a href="#"> <i class="fa fa-users text-aqua"></i>${i.question.slice(10)}</a> </li>`;
            });

            return env.getFilter('safe')(lst);
        })
    })
};