var fs = require("fs");
var deck_repo = require("../models/deck");
var slide_repo = require("../models/slide");
var themes = require("../models/themes");

module.exports = function(app){

    app.get("/template/create", function(req, res) {
    	res.render("templatecreate", { layout: "presentation-layout" });
    });

    app.get("/:id/template.css", function(req, res) {
        var id = req.params.id;

        if (id) {
            deck_repo.model.findById(id, function(req, deck) {
                if (deck) {
                    var template = deck.template;
                    console.log("HERE", template)
                    res.header("Content-Type", "text/css");
                    res.render("template.css.ejs", { tags: (template && template.tags) ?  template.tags : [], layout: false });
                }
            });
        } else {
            res.send("404");
        }
    });

    app.get("/template/default/:id", function(req, res) {
        var a = themes[req.params.id];
        if (a) {
            res.header("Content-Type", "text/css");
            console.log(a);
            res.render("template.css.ejs", { tags:  a , layout: false });
        }
        else {
            res.send("404", 404);
        }
    });
    
    app.get("/template/ejsmarkup.ejs", function(req, res) {
        var dirname = __dirname + "/../";
        var fd = fs.readFileSync(dirname + "/views/template.css.ejs", "utf8");
        res.send(fd);
    });

    app.post("/template/:id", function(req, res) {
        var id = req.param.id;
        var tags = req.param("tags", []);
        deck_repo.model.findById(id, function(req, deck) {
            var template = deck.template;
            template.tags = tags;
            deck.save(function() {
                res.send(deck.template.tags);
            });
        });
    });
};

