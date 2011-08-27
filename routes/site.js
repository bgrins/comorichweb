var fs = require("fs");
var deck_repo = require("../models/deck.js");

    module.exports = function(app){
    
    app.get("/dashboard", function(req, res) {
    	if(!req.session.user) {
    		res.redirect("/");
    		return;
    	}
    	
	    deck_repo.model.findByUser(req.session.user, function(err, decks) {
	        res.render("dashboard", { 
	        	decks: decks,
	        	layout: "site.ejs"
	        });
	    });
    });
        
    app.get("/template", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        res.render("templateeditor");
    });

};
