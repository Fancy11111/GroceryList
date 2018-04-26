const mongoose = require('mongoose');

let listSchema = mongoose.Schema({
    kosten: {type: Number},
    erledigt: {type: Number},
    produkt: {type: String}
});

listSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = listSchema;