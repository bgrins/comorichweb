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

    app.all("/slide/create", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var deckid = req.param("deckid", "4e591512259871c70e000001");
        var sort = req.param("sort", 0);

        var slide = {
            sort: sort,
            content: content
        };

        deckRepo.model.findById(deckid, function(err, deck) {
            deck.slides.push(slide);
            deck.save(function(err) {
                if (err) {
                    throw err;
                }
                else {
                    res.send(deck);
                }
            });
        });
    });

    app.all("/slide/update", function(req, res) {
        var deckid = req.param("deckid", null);
        var slides = req.param("slides", null);

        deckRepo.model.findById(deckid, function(err, deck) {
            slides.forEach(function(slide) {
                deck.slides.forEach(function(dbslide) {
                    if (slide._id == dbslide._id) {
                        dbslide.content = slide.content;
                        dbslide.sort = slide.sort;
                    }
                });
            });
        });
    });

    app.all("/slide/delete", function(req, res) {


    });

    app.get("/slide/get", function(req, res) {


    });
};

