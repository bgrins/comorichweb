var fs = require("fs");
var Deck = require("../models/deck.js").model;

    module.exports = function(app){
    
    app.get("/dashboard", function(req, res) {
    	if(!req.session.user) {
    		res.redirect("/");
    		return;
    	}
    	
	    Deck.findByUser(req.session.user, function(err, decks) {
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
