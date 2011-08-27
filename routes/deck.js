var fs = require("fs");
var deck_repo = require("../models/deck");

module.exports = function(app){
    app.get("/deck/create", function(req, res) {
        res.render("createdeck", { layout: "layout.ejs" });
    });
    
    app.post("/deck/create", function(req, res) {
        var title = req.param("title", "Deck");
        var deck = new deck_repo.model;
        deck.title = title;
        deck.author = req.session.user
        deck.save(function(err, deck) {
            res.redirect("/deck/edit/" + deck._id);
        });
    });

    app.get("deck/update", function(req, res) {
    });
    
    app.get("/deck/edit/:id", function(req, res) {
    	if(!req.session.user) {
    		res.redirect("/");
    		return;
    	}
    	
        var id = req.params.id;
    	deck_repo.model.findById(id, function(err, deck) {
    		if (deck.author.id != req.session.user.id) {
    			res.render('errors/404');
    		}
    		else {
    	    	res.render("editdeck", { deck : deck });
    	    }
    	});
    });
};

