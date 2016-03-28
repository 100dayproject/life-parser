"use strict";

let express = require('express'),
    router = express.Router(),
    blog = require('./controllers/blog');

router.route('/blog').get(__.isAllow('list_posts'), blog.list).delete(__.isAllow('delete_post'), blog.delete);
router.route('/blog/create').get(__.isAllow('create_post'), blog.create).post(__.isAllow('create_post'), blog.created);
router.route('/blog/view/:id').get(__.isAllow('list_posts'), blog.view).post(__.isAllow('update_post'), blog.updated).delete(__.isAllow('delete_post'), blog.delete);

module.exports = router;