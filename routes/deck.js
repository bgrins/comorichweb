var fs = require("fs");
var deck_repo = require("../models/deck");

module.exports = function(app){
    app.get("/deck/create", function(req, res) {
        res.render("createdeck");
    });

    app.post("/deck/create", function(req, res) {
        var title = req.param("title", "Deck");
        var deck = new deck_repo.model;
        deck.title = title;
        deck.slides.push({
            content: "TESTING HERE HERE HIII ",
            sort: 0
        });
        
        deck.save(function() {
            res.redirect("/app");
        });
    });

    app.get("deck/update", function(req, res) {
    });
};

