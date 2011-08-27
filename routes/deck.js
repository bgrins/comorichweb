var fs = require("fs");
var deck_repo = require("../models/deck");
var siteConf = require('../lib/getConfig');
var sys = require("sys");
var exec = require("child_process").exec;

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
    
    app.all("/deck/:id", function(req, res) {
        var id = req.params.id;

        var deck = deck_repo.model.findById(id, function(err, deck) {
            res.render("slideshow", {
                slides: deck.slides,
                layout: "presentation-layout.ejs"
            });
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
    
    app.get("/deck/exportview/:id.html", function(req, res) {
        var id = req.params.id;
        deckRepo.model.findById(id, function(err, deck) {
            res.render("slideshow", {
                slides: deck.slides,
                layout: "presentation-layout.ejs"
            });
        });
    });

    app.get("/deck/export/:id", function(req, res) {
        var id = req.params.id;
        var uid = new Date().getTime();
        var dir = siteConf.tempDir + uid;
        var url = siteConf.uri + "/deck/exportview/" + id + ".html";
        var zipfile = siteConf.tempDir + uid + ".zip";
        console.log(url);
        console.log(zipfile);

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
                console.log(n);
                res.end();
            });
        });

        return;



        /*


        var mkdir = "mkdir " + dir;
        console.log(mkdir);

        exec(mkdir, function(err, stdout, stderr) {
            var wget = "wget --force-html --convert-links --no-directories --page-requisites --base=" + url + " --directory-prefix=" + dir + " " + url;
            console.log(wget);

            exec(wget, ff (err) {
                            throw err;
                                        }
                                        unction(err, stdout, stderr) {
                var cd = "cd " + dir;
                exec(cd, function() {
                    var mv = "mv ./*.html ./index.html";
                    exec(mv, function() {
                        var zip = "zip " + zipfile + "./*";
                        exec(zip, function(err, stdout, stderr) {
                            console.log(stdout);
                    });
                });
            });
        });
        */
    });


    
    app.get("/deck/:id", function(req, res) {
        var id = req.params.id;

        deckRepo.model.findById(id, function(err, deck) {
            res.render("slideshow", {
                slides: deck.slides,
                layout: "presentation-layout.ejs"
            });
        });
    });
};

