var fs = require("fs");
var deck_repo = require("../models/deck.js");

    module.exports = function(app){
    
    app.get("/app/:id", function(req, res) {
        var id = req.params.id;
    	
    	deck_repo.model.findById(id, function(err, deck) {
    	    res.render("app", { deck : deck });
    	});
    });
    
    app.get("/dashboard", function(req, res) {
      	if(req.session.user){
	    	deck_repo.model.find({}, function(err, decks) {
	    	    res.render("dashboard", { 
	    	    	decks: decks,
	    	    	layout: "site.ejs"
	    	    });
	    	});
    	}
    	else {
    		
    	}
    });
        
    app.get("/template", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        res.render("templateeditor");
    });

};

