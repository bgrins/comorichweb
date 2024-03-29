var mongoose = require('mongoose');
var db = require('./db');
var slide_repo = require('./slide');
var template_repo = require('./template');

var schema = new mongoose.Schema({
        name: String,
        author: mongoose.SchemaTypes.Mixed,
        title: String,
        template: mongoose.SchemaTypes.Mixed,
        slides: [slide_repo.schema]
});

schema.statics.findByUser = function(user, cb){
  model.find({'author.id':user.id}, cb);
};
var model = mongoose.model("Deck", schema);
 
module.exports = {
    schema: schema,
    model: model
}
