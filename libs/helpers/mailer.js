/**
 * @license
 * Copyright (c) 2016 The {life-parser} Project Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://100dayproject.github.io/LICENSE.txt
 * The complete set of authors may be found at http://100dayproject.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://100dayproject.github.io/CONTRIBUTORS.txt
 * Code distributed by 100dayproject as part of the life.
 */

"use strict";

let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let Promise = require('bluebird');

class mailer {
    constructor(auth, bcc, subject, content, options) {
        this.auth = auth;
        this.bcc = bcc;
        this.subject = subject;
        this.content = content;
        this.options = options || {};
    }

    send() {
        if (!this.options) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: this.auth
            }, {
                from: this.auth.user,
                headers: {'100dayproject.org': 'WebSphere.'}
            });
            transporter.sendMail({
                from: `100dayproject< ${this.auth.user} >`, // sender address
                bcc: this.bcc, // list of receivers
                subject: this.subject, // Subject line
                html: this.content  // html body
            }, function (error, info) {
                if (error !== null) {
                    return error;
                } else {
                    console.log(info);
                    return info;
                }
            });
        } else if (this.options && this.options.service && this.options.service.name.toLocaleLowerCase() == 'zoho') {
            let mailServer = {
                host: 'smtp.zoho.com',
                port: 465,
                secure: true,
                auth: this.auth
            };
            let transporter = nodemailer.createTransport(smtpTransport(mailServer), {
                // default values for sendMail method
                from: this.auth.user,
                headers: {
                    '100dayproject.org': 'WebSphere.'
                }
            });
            return new Promise(function (fullfill, reject) {
                transporter.sendMail({
                    from: `100dayproject < ${this.auth.user} >`, // sender address
                    bcc: this.bcc, // list of receivers
                    subject: this.subject, // Subject line
                    html: this.content  // html body
                }, function (error, info) {
                    if (error) {
                        reject(error);
                    } else {
                        fullfill(true);
                    }
                });
            });

        } else if (this.options && this.options.service && this.options.service.name) {
            let mailServer = {
                host: this.options.service.host,
                port: this.options.service.port,
                secure: true,
                auth: this.auth
            };
            let transporter = nodemailer.createTransport(smtpTransport(mailServer), {
                // default values for sendMail method
                from: this.auth.user,
                headers: {
                    '100dayproject.org': 'WebSphere.'
                }
            });
            transporter.sendMail({
                from: `100dayproject < ${this.auth.user} >`, // sender address
                bcc: this.bcc, // list of receivers
                subject: this.subject, // Subject line
                html: this.content  // html body
            }, function (error, info) {
                if (error) {
                    return error;
                } else {
                    return info;
                }
            });
        }
    }
}

module.exports = mailer;