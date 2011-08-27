var mongoose = require('mongoose');
mongoose.connect('localhost', 'sample-app');
var fs = require('fs');
var Schema = mongoose.Schema;
var GridStore = require('mongodb').GridStore;


/** Slide.js */
var SlideSchema = new Schema({
    _id: String,
    content: String,
    sort: Number
});
var slide = mongoose.model("Slide", SlideSchema);
exports.SlideSchema = SlideSchema;
exports.Slide = slide;


/** User.js */
var UserSchema = new Schema( {
    _id: String,
});
exports.User = mongoose.model("User", UserSchema);
exports.UserSchema = UserSchema;


/** Deck.js */
var DeckSchema = new Schema({
    _id: String,
    title: String,
    slides: [SlideSchema]
});

var deck = mongoose.model("Deck", DeckSchema);

/* Static Deck Methods */
deck.findById = function(id, callback) {
    deck.find({ _id: id }, function(err, deck) {
            callback(deck);
    });
};

exports.DeckSchema = DeckSchema;
exports.Deck = deck;



