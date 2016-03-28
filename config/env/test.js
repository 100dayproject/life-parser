"use strict";

module.exports = {
    db: {
        host: 'localhost',
        secondary: 'localhost',
        port: '27017',
        database: 'lifeparser',
        username: 'hai',
        password: 'social',
        dialect: 'mongodb',
        logging: false
    },
    redis: {
        host: 'localhost',
        port: '6379',
        acl_prefix: 'acl_'
    },
    facebookAuth: {
        clientID: process.env.FACEBOOK_ID || '1023532197688890',
        clientSecret: process.env.FACEBOOK_SECRET || '7ce5a603aa970aabdbba4dd1dabbc96e',
        callbackURL: process.env.FACEBOOK_URL || 'http://localhost:1337/auth/facebook/callback'
    },
    googleAuth: {
        clientID: process.env.GOOGLE_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
        callbackURL: process.env.GOOGLE_URL || ''
    }
};