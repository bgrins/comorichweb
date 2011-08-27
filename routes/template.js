var fs = require("fs");
var deckRepo = require("../models/deck");
var slideRepo = require("../models/slide");

module.exports = function(app){
    app.get("/template/:id.css", function(req, res) {
        var tags = [ {
                name : "h1",
                font: "comic sans ms",
                color: "green",
                size: ".5em",
                margin: "5px",
                fontWeight: "bold",
                border: "1px solid red",
                borderRadius: "35px",
        }];

        res.header("Content-Type", "text/css");
        res.render("template.css.ejs", { tags: tags, layout: false });
    });

};

