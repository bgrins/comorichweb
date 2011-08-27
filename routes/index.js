var fs = require("fs");
var Deck = require("../models/deck.js").model;
module.exports = function(app){
    app.all('/', function(req, res) {
        Deck.find({}, function(err, decks){
          res.render('index', {layout: "site.ejs", decks:decks });
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

