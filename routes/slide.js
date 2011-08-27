var fs = require("fs");
var models = require("../models/slideshow.js");

module.exports = function(app){
    app.all("/slideshow", function(req, res) {
       res.render("slideshow", {
            slides: models.Slide.find({})
        }); 
    });

    app.all("/slide/add", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var slide = new models.Slide();
        slide.content = content;
        slide.save();
        res.render("slideshow", {
            layout: "presentation-layout.ejs",
            title: "this is a slideshow"
        }); 
    });
}

