var fs = require("fs");
var Deck = require("../models/deck.js").model;
module.exports = function(app){
    app.get('/', function(req, res) {
        var a = Deck.find({});
a.limit(7);
    a.exec(function(err, result) {
            res.render('index', {layout: "site.ejs", decks:result });
        });
    });

    fs.readdir(__dirname, function(err, files){
      files.forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
      });
    });
};

