const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const user      = mongoose.
var Cube        = new Schema({
    code: {
        type: int,
        required: true
    }

    propietari: {
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        required: false,
        default: 
    }
})

var cube = mongoose.model('CUBE', Cube)
