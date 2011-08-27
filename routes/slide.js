var fs = require("fs");
var models = require("../models/slideshow.js");

module.exports = function(app){
    app.all("/slideshow", function(req, res) {
       res.render("slideshow", {
            layout: "presentation-layout.ejs",
            title: "this is a slideshow"
       }); 
    });

    app.post("/slide/add", function(req, res) {
            req.param("content", "welcome to slideshow.js!");
    }):
}

