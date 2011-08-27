var mongoose = require('mongoose');
var db = require('./db');
var slide_repo = require('./slide');

var schema = new mongoose.Schema({
        _id: String,
        name: String,
        title: String,
        slides: [slide_repo.schema]
});

var model = mongoose.model("Deck", schema);
 
module.exports = {
    schema: schema,
    model: model
}
