var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    content: String,
    sort: Number
});

var model = mongoose.model("Slide", schema);

module.exports = {
    schema: schema,
    model: model
}
