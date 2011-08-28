var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    name: String,
    font: String,
    color: String,
    size: String,
    margin: String,
    fontweight: String,
    border: String,
    borderradius: String,
    textshadow: String
})

var schema = new mongoose.Schema({
    tags: [tagSchema]
});

var model = mongoose.model("Template", schema);

module.exports = {
    schema: schema,
    model: model
}
