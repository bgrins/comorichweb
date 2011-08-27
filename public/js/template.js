
var template = {
	init: function() {
		var parser = new(less.Parser)({
		
		});
		
		parser.parse('.class { width: 1 + 1 }', function (e, tree) {
			log(tree);
		});
	}
};
