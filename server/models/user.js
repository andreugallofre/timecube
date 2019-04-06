const mongoose  = require('mongoose');
const schema    = mongoose.Schema;

const User      = new Schema({
    name: {
        type: String,
        required: true
    }

    surname: {
        type: String,
        required: true
    }
    email: {
        type: String,
        required: true,
        regexp: "/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/"
    }
})

var user = mongoose.model('USER',User)
