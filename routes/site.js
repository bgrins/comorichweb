var fs = require("fs");
var Deck = require("../models/deck.js").model;
var User = require("../models/user.js");
var emitter = new(require('events').EventEmitter);

module.exports = function(app){
    
    app.get('/profile/edit', function(req, res){
      var user = Object.freeze(req.session.user);
      res.render('edit-profile', {currentUser:user});
    });
    app.post('/profile/edit', function(req, res){
      var user = req.param('currentUser');
      req.session.user.email = user.email;
      req.session.user.bio = user.bio;
      req.session.user.web = user.web;
      new User.model(req.session.user).save()
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
