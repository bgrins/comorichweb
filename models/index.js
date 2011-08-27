var mongoose = require('mongoose');
mongoose.connect('localhost', 'sample-app');
var fs = require('fs');
var Schema = mongoose.Schema;
var GridStore = require('mongodb').GridStore;


var SlideSchema = new Schema({
    _id: String,
    content: String
});

exports.SlideSchema = SlideSchema;
exports.Slide = mongoose.model("Slide", SlideSchema);


var UserSchema = new Schema( {
    _id: String,
});

exports.User = mongoose.model("User", UserSchema);
exports.UserSchema = UserSchema;

var PresentationSchema = new Schema({
    _id: String,
    title: String,
    slides: [SlideSchema]
});

exports.PresentationSchema = PresentationSchema;
exports.Presentation = mongoose.model("Presentation", PresentationSchema);
