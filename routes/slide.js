var fs = require("fs");
var deckRepo = require("../models/deck");
var slideRepo = require("../models/slide");
var _ = require("underscore");

module.exports = function(app){
    app.post("/slide/create", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var deckid = req.param("deckid", "4e591512259871c70e000001");
        var sort = req.param("sort", 0);
        var slide = {
            sort: sort,
            content: content
        };

        deckRepo.model.findById(deckid , function(err, deck) {
            var ind = deck.slides.push(slide) - 1;
            
            deck.save(function(err, deck) {
                if (err) {
                    throw err;
                }
                
                res.send(deck.slides[ind]);
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
				
            });
            
            deck.save(function(err) {
                res.send(deck);
            });

        });
    });

    app.all("/slide/delete", function(req, res) {
        var deckid = req.param("deckid", null);
        var slideid = req.param("slideid", null);

	console.log(req.session.user);
	console.log(deckid);
	console.log(slideid);

    	if(!req.session.user || !deckid || !slideid) {
            res.send("401", 401);
    		return;
    	}
    	deckRepo.model.findById(deckid, function(err, deck) {
    		if (!deck || !deck.author || deck.author.id != req.session.user.id) {
                res.send("401", 401);
    		}
    		else {
                deck.slides = _.reject(deck.slides, function(slide) {
                    return slide._id == slideid;
                });

                deck.save(function() {
                    res.send("200", 200);
                });
    	    }
        });
    });

    app.get("/slide/preview/:id", function(req, res) {
        var id = req.params.id;
        
        slideRepo.model.findById(id, function(err, slide) {
        	if (err || !slide) {
        		res.send("404");
        		return;
        	}
        	
            res.render("slideshow", {
                deck: slide.deck,
                layout: "presentation-layout.ejs",
                ignoreSlides: true
            });
        });
            
    });
    app.post("/slide/get", function(req, res) {


    });
};

