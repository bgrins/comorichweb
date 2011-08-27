var fs = require("fs");
var deckRepo = require("../models/deck");

module.exports = function(app){
    app.all("/deck/:id", function(req, res) {
        var id = req.params.id;
        console.log(id);

        var deck = deckRepo.model.findById(id, function(err, deck) {
            res.render("slideshow", {
                slides: deck.slides,
                layout: "presentation-layout.ejs"
            });
        });
    });

    app.post("/slide/create", function(req, res) {
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
                    res.send(deck);
                }
            });
        });
    });

    app.post("/slide/update", function(req, res) {
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

                deck.save(function(err) {
                    res.send(deck);
                });;
            });

        });
    });

    app.post("/slide/delete", function(req, res) {


    });

    app.post("/slide/get", function(req, res) {


    });
};

