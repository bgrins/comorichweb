var mongoose = require('mongoose');

var blockSchema = new mongoose.Schema({
    font: String,
    color: String,
    size: String,
    margin: String,
    fontWeight: String,
    border: String,
    borderRadius: String,
    textShadow: String
});


var supportedTags = [ "h1", "h2", "h3", "h4", "h5", "p"
                      "p", "li", "ul", "img", "pre", "ol"
                      "table", "tr", "td", "th" ];

var tmpschema = {};
for (int i = 0; i < supportedTags.length; i++) {
    tmpschema[supportedTags[i]] = [blockSchema];
}

var schema = new mongoose.Schema(
   tmpschema 
        /*{
    h1: [blockSchema],
    h2: [blockSchema],
    h3: [blockSchema],
    h4: [blockSchema],
    h5: [blockSchema],
    p: [blockSchema],
    li: [blockSchema],
    ul: [blockSchema],
    img: [blockSchema],
    pre: [blockSchema],
    ol: [blockSchema],
    table: [blockSchema],
    tr: [blockSchema],
    td: [blockSchema],
    th: [blockSchema],
}*/);

var model = mongoose.model("Template", schema);

module.exports = {
    schema: schema,
    model: model
}
