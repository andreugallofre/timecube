const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
var Cube        = new Schema({
    code: {
        type: int,
        required: true
    },

    propietari: {
        type: Schema.Types.ObjectId,
        ref: 'USER',
        required: false,
        default: undefined
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