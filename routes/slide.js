var fs = require("fs");
var deckRepo = require("../models/deck");

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

    app.all("/slide/create/:deckid", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var deckid = req.param("deckid", "4e591512259871c70e000001");
        var sort = req.param("sort", 0);
        var slide = {
            sort: sort,
            content: content
        };

        deckRepo.model.findById(deckid , function(err, deck) {
            deck.slides.push(slide);
            deck.save(function(err) {
                if (err) {
                    throw err;
                }
                else {
                    console.log(deck);
                    deckRepo.model.find({}, function(err, decks) {
                        console.log(decks);
                    });
                    res.send(deck);
                }
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

