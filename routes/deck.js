var fs = require("fs");
var models = require("../models");

module.exports = function(app){
    app.get("/deck/create", function(req, res) {
        var title = req.param("title", "Deck");
        var deck = new models.Deck();
        deck.title = title;
        deck.slies = [];
        deck.save(function() {
            res.send(deck);
        });
    });

    app.get("deck/update", function(req, res) {
        var id = req.param("_id", null);
        models.Deck.getById(function() {
            var deck = {};
            return deck;
        });
    });



};

