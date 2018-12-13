const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    facebook:{
        type: String
    },
    google: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    fullname: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    wallet: {
        type: Number,
        default: 2
    }
});

module.exports = mongoose.model('User',userSchema);