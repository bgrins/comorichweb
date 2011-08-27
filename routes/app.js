var fs = require("fs");
var deck_repo = require("../models/deck.js");

    module.exports = function(app){
    
    app.get("/app/:id?", function(req, res) {
        var id = req.params.id;
        
        if (id ) {
            deck_repo.model.findById(id, function(err, deck) {
                res.render("app", { deck : deck });
            });
        }
    });
    
    app.get("/dashboard", function(req, res) {
    	deck_repo.model.find({}, function(err, decks) {
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

    app.get('/your-slides', function(req, res){
      var decks = [];
      if(req.session.user){
        deck_repo.model.findByUser(req.session.user, function(err, decks){
          res.render('your-slides', {decks:decks});
          console.log(decks)
        });
      }else{
        res.render('your-slides', {decks:decks});
      }
    });
};

