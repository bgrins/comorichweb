module.exports = function(app){
    app.all('/', function(req, res) {
        if (!req.session.uid) {
            req.session.uid = (0 | Math.random()*1000000);
        }
        res.locals({
            'key': 'value'
        });
        res.render('index');
    });

    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}

