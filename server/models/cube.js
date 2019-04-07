const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var Cube        = new Schema({
    code: {
        type: Number,
        required: true
    },

    propietari: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: false,
        default: null
    },

    cares: [{
        num: {type: Number, required: true},
        task: {
            type: Schema.Types.ObjectId,
            ref: 'TASK'
        }
    }]
})

var cube = mongoose.model('CUBE', Cube)
module.exports = cube;
