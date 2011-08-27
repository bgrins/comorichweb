var fs = require("fs");
var models = require("../models");

module.exports = function(app){
    app.all("/slideshow", function(req, res) {
        models.Slide.find({}, function(err, slides) {
            if (!err) {
                res.render("slideshow", {
                    slides : slides,
                    layout: "presentation-layout.ejs"
                });
            }
            else {
                res.send("ERR");
            }
        }); 
    });

    app.all("/slide/create", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var deckid = req.param("deckid", null);
        var sort = req.param("sort", 0);

        models.Deck.find({}, function(err, decks) {
            var deck = decks[0];
            var slide = new models.Slide();
            slide.sort = sort;
            slide.content = content;
            slide.save(function(err) {
                console.log(deck.slides);
                deck.slides.push(slide);
                console.log(deck.slides);
                deck.save();

                res.send(slide);
            });
        });
    });

    app.all("/slide/update", function(req, res) {
       var slides = req.param("slides", null);
       var id = req.param("_id", null);
        
       if (id ) {
       }
    });

    app.all("/slide/delete", function(req, res) {


    });

    app.get("/slide/get", function(req, res) {


    });
};

