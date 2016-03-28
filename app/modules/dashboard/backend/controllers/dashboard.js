"use strict";

let _module = new __viewRender('backend', 'dashboard'),
    Promise = require('bluebird');

_module.index = function (req, res) {

    if (req.user.questions || req.user.questions == []) {
        __models.Faculty.find({_id: {$in: req.user.faculty_id}}, {name: 1}).exec(function (err, faculties) {
            if (err) {
                __.logger.error(err);
                return _module.render_error(req, res, '500');
            }
            _module.render(req, res, 'index', {
                title: `Bác sĩ ${req.user.last_name} ${req.user.first_name}`,
                pageTitle: 'Dashboard',
                doctor: true,
                faculties: faculties
            })
        });

    } else {
        let dateNow = new Date(Date.now());
        //let queryToday = [
        //    {
        //        $project: {
        //            year: {$substr: ['$created_date', 0, 4]},
        //            month: {$substr: ['$created_date', 5, 2]},
        //            day: {$substr: ['$created_date', 8, 2]}
        //        }
        //    }, {
        //        $match: {
        //            year: dateNow.getFullYear().toString(),
        //            month: String('00' + (parseInt(dateNow.getMonth()) + 1).toString()).slice(-2),
        //            day: String('00' + dateNow.getDate().toString()).slice(-2)
        //        }
        //    }
        //];

        //** Make a controllers here */
        Promise.all([
            __models.Question.find().count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),
            __models.Answer.find().count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),
            __models.User.find().count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),
            __models.Doctor.find().count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),
            // Details

            // Số câu hỏi đã được trả lời
            __models.Question.find({answers: {$exists: true, $not: {$size: 0}}}).count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),

            // Số lượng bác sỹ hoạt động trên hệ thống với trạng thái đã được xác minh
            __models.Doctor.find({active_state: {$in: ['accepted', 'pending']}}).count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),

            // Thành viên VIP
            __models.User.find({is_premium: true}).count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),

            // Câu hỏi chưa được trả lời.
            __models.Question.find({
                source: 'from_user',
                is_removed: false,
                answers: {$size: 0}
            }).count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            }),

            // Câu hỏi chưa gán topics
            __models.Question.find({
                source: 'from_user',
                is_removed: false,
                topics: {$size: 0}
            }).count(function (err, re) {
                if (err) __.logger.error(err);
                return re;
            })
        ]).then(function (allCount) {
            _module.render(req, res, 'index', {
                title: 'Administrator home page',
                pageTitle: 'Dashboard',
                count: allCount
            })
        });

    }
};

module.exports = _module;