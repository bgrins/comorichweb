module.exports = function(app){
  var number = 1;
  app.get('/demo', function(req, res){
    res.render('demo/index', {id:number++, layout:'demo'});
  });
  app.get('/demo/remote/:id', function(req, res){
    res.render('demo/remote', {id: req.param('id'), layout:'demo'});
  });
};
