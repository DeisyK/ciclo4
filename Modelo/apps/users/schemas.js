'use strict';
const mongoose = require('../../config/mongoose'),
    Schema = mongoose.Schema;
    
const schemas = {
    userSchema: newSchema({
        username: {type: String},
        password: {type: String},
    })
};

module.exports = schemas;