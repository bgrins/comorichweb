var fs = require("fs");
var deck_repo = require("../models/deck");
var siteConf = require('../lib/getConfig');
var sys = require("sys");
var exec = require("child_process").exec;
var themes = require("../models/themes");

module.exports = function(app){
    app.get("/deck/create", function(req, res) {
        var dirname = __dirname + "/../";
         
        
        var fd = fs.readFileSync(dirname + "/views/template.css.ejs", "utf8");
        res.render("createdeck_updated", { layout: "layout.ejs", ejs: fd, templates: themes });
    });
    
    app.post("/deck/create", function(req, res) {
        var title = req.param("title", "Deck");
        var template = [];
        
        template = JSON.parse(req.param("template"));
        try { template = JSON.parse(req.param("template")); }
        
        
        catch(e) { console.log("ERROR", e); }
        console.log("TEMPLATE", template);
        
        
        var deck = new deck_repo.model;
        deck.title = title;
        deck.template = template;
        deck.author = req.session.user;
        deck.save(function(err, deck) {
            res.redirect("/deck/edit/" + deck._id);
        });
    });
    
    app.post("/deck/update", function(req, res) {
        var id = req.param("deckid", null);
        var name = req.param("name", null);
        var title = req.param("title", null);

    	if(!req.session.user || !id) {
            res.send("4011211", 401);
    		return;
    	}
        var deck = deck_repo.model.findById(id, function(err, deck) {
    		if (!deck || !deck.author || deck.author.id != req.session.user.id) {
                res.send("401sadflkasjdfasldfj", 401);
    		}
            else {
                deck.name = name || deck.name;
                deck.title = title || deck.title;
                deck.save();
                res.send(deck);
            }
        });
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
    
    app.get("/deck/exportview/:id.html", function(req, res) {
        var id = req.params.id;
        deck_repo.model.findById(id, function(err, deck) {
            res.render("slideshow", {
                deck: deck,
                layout: "presentation-layout.ejs",
            });
        });
    });

    app.get("/deck/export/:id", function(req, res) {
        var id = req.params.id;
        var uid = new Date().getTime();
        var dir = siteConf.tempDir + uid;
        var url = siteConf.uri + "/deck/exportview/" + id + ".html";
        var zipfile = siteConf.tempDir + uid + ".zip";
        var cmd = "bash " +siteConf.zipExec;

        exec(cmd + " " + dir + " " + url + " " + zipfile, function(err, stdout, stderr) {
            console.log(stdout);
            fd = fs.openSync(zipfile, "r");
            size = fs.fstatSync(fd).size;
            res.writeHead(200, {
                "Content-Length": size,
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=deck.zip"
            });
            res._send('');
            fs.sendfile(req.connection.fd, fd, 0, size, function(err, n) {
                if (err) {
                    throw err;
                }   

                res.end();
            });
        });
    });


    app.all("/deck/embed/:id", function(req, res) {
      res.render('slideshow-with-comments', {id:req.param('id')});
    });
    app.all("/deck/:id", function(req, res) {
        var id = req.params.id;
        var slideID = req.param("slideid", false);
        var deck = deck_repo.model.findById(id, function(err, deck) {
        	if (err || !deck) {
    			res.render('errors/404', 404);
    			return;
        	}
            res.render("slideshow", {
                deck: deck,
                layout: "presentation-layout.ejs",
                slideID: slideID
            });
        });
    });
    
};

