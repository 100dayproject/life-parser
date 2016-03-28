"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let objectSchema = new Schema({
    _key: {type: String},
    name: {type: String},
    content: {type: String},
    value: {type: String},
    permissions: {type: String},
    created_by: {type: Schema.Types.ObjectId, ref: 'Admin'},
    created_at: {type: Date},
    status: {type: String, enum: ['Draft', 'Publish']},
    alias: {type: String}
});

module.exports = mongoose.model('objects', objectSchema);