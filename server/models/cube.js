const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var Cube        = new Schema({
    code: {
        type: int,
        required: true
    },

    propietari: {
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'USER'},
        required: false,
    }
})

var cube = mongoose.model('CUBE', Cube)
module.exports = cube;