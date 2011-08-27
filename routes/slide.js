var fs = require("fs");
var deckRepo = require("../models/deck");
var slideRepo = require("../models/slide");
var sys = require("sys");
var exec = require("child_process").exec;
var siteConf = require('../lib/getConfig');

module.exports = function(app){
    app.get("/deck/:id", function(req, res) {
        var id = req.params.id;

        deckRepo.model.findById(id, function(err, deck) {
            res.render("slideshow", {
                slides: deck.slides,
                layout: "presentation-layout.ejs"
            });
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

    app.get("/deck/:id/export", function(req, res) {
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


    app.post("/slide/create", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var deckid = req.param("deckid", "4e591512259871c70e000001");
        var sort = req.param("sort", 0);
        var slide = {
            sort: sort,
            content: content
        };

        deckRepo.model.findById(deckid , function(err, deck) {
            var ind = deck.slides.push(slide) - 1;
            
            deck.save(function(err, deck) {
                if (err) {
                    throw err;
                }
                
                res.send(deck.slides[ind]);
            });
        });
    });

    app.post("/slide/update", function(req, res) {
        var deckid = req.param("deckid", null);
        var slides = req.param("slides", null);

        deckRepo.model.findById(deckid, function(err, deck) {

            slides.forEach(function(slide) {
                deck.slides.forEach(function(dbslide) {
                    if (slide._id == dbslide._id) {
                        dbslide.content = slide.content;
                        dbslide.sort = slide.sort;
                    }
                });

                deck.save(function(err) {
                    res.send(deck);
                });;
            });

        });
    });

    app.post("/slide/delete", function(req, res) {


    });

    app.post("/slide/get", function(req, res) {


    });
};

