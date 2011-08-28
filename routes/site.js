var fs = require("fs");
var Deck = require("../models/deck.js").model;

    module.exports = function(app){
    
    app.get('/profile', function(req, res){
      res.render('profile', req.session.user);
    });
    app.post('/profile', function(req, res){
      var user = req.param('user');
      req.user.email = user.email;
      req.user.web = user.web;
      req.user.bio = user.bio;
      req.user.save()
      res.redirect('/dashboard');
    });
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
