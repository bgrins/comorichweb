var fs = require("fs");
var models = require("../models");

module.exports = function(app){
    app.all("/slideshow", function(req, res) {
        models.Slide.find({}, function(err, slides) {
            if (!err) {
                res.render("slideshow", {
                    slides : slides,
                    layout: "presentation-layout.ejs"
                });
            }
            else {
                res.send("ERR");
            }
        }); 
    });

    app.get("/slide/add", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        var slide = new models.Slide();
        slide.content = content;
        slide.save(function(err) {
           console.log(err); 
        });

        res.send(slide);
    });
};

