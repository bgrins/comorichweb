var fs = require("fs");
    module.exports = function(app){
    
    app.get("/app", function(req, res) {
        var content = req.param("content", "welcome to slideshow.js!");
        res.render("app");
    });
};

