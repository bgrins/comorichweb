var fs = require("fs");
var Deck = require("../models/deck.js").model;
var User = require("../models/user.js").model;
var emitter = new(require('events').EventEmitter);

module.exports = function(app){
    app.get('/profile/edit', function(req, res){
      var user = Object.freeze(req.session.user);
      res.render('edit-profile', {currentUser:user});
    });
    app.get('/profile/view/:id', function(req, res){
      User.findOne({id:req.param('id')}, function(err, dude){
        User.find({}, function(err, people){
          Deck.findByUser(dude, function(err, decks) {
            res.render("dashboard", { 
              decks: decks
              , layout: "site.ejs"
              , followers: people
            });
          });
        });
      });
    });
    app.post('/profile/edit', function(req, res){
      var user = req.param('currentUser');
      req.session.user.email = user.email;
      req.session.user.bio = user.bio;
      req.session.user.web = user.web;
      new User(req.session.user).save()
      res.redirect('/dashboard');
    });
    app.get("/dashboard", function(req, res) {
    	if(!req.session.user) {
    		res.redirect("/");
    		return;
    	}
      var users = [];
      User.find({}, ['id', 'name', 'image'], function(err, people){
        console.log(people[0].image);
        Deck.findByUser(req.session.user, function(err, decks) {
            res.render("dashboard", { 
              decks: decks
              , layout: "site.ejs"
              , followers: people

            });
        });
      });
    });
    app.get('/wtf', function(req, res){
      User.find({}, ['id', 'name', 'image'], function(err, people){
        res.render('wtf', {folks: people});
      });
    });     
    app.get("/template", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        res.render("templateeditor");
    });

};
