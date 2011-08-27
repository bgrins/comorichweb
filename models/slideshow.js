var mongoose = require("mongoose");
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GridStore = require('mongodb').GridStore;
mongoose.connect('localhost', 'sample-app');

var SlideSchema = new Schema({
    content: String
});
var PresentationSchema = new Schema( {
    title: String,
    slides: [SlideSchema]
});

exports.Slides = mongoose.model("Slide", SlideSchema);
exports.Presentation = mongoose.model("Presentation", PresentationSchema);
