var fs = require("fs");

module.exports = function(app){
    app.all("/slideshow", function(req, res) {
       res.render("slideshow", {
            layout: "presentation-layout.ejs",
            title: "this is a slideshow"
       }); 
    });
}

