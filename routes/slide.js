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

        if (deckid) {
            models.Deck.findById(deckid, function(deck) {
                console.log(deckid, deck);
                var slide = new models.Slide();

                slide.sort = sort;
                slide.content = content;

                slide.save(function(err) {
                    if (!err) {
                        deck.add(slide);
                        deck.save(function() {
                            res.send(slide);
                        });
                    }
                });
            });
        }

        res.send("fail");
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

