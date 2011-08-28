var mongoose = require('mongoose');
var db = require('./db');
var Deck = require('./deck').model,
    Mixed = mongoose.SchemaTypes.Mixed;

var UserSchema = new mongoose.Schema({
  id: {type: String, default: '', unique: true}
  , name: {type:String, default: ''}
  , image: {type:String, default: ''}
  , email: {type:String, default: ''}
  , bio: {type:String, default: ''}
  , web: {type:String, default: ''}
  , following: [UserSchema]  
  , followers: [UserSchema]  
});

UserSchema.methods.getSlideDecks = function(cb){
  return Deck.find({'author.id':user.id}, cb);
}
var model = mongoose.model("User", UserSchema);

module.exports = {
    schema: UserSchema,
    model: model
}
