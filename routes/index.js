var fs = require("fs");
module.exports = function(app){
    app.all('/', function(req, res) {
        res.render('index', {layout: "site.ejs"});
    });

    fs.readdir(__dirname, function(err, files){
      files.forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
      });
    });
};

