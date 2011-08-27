
var template = {
	slider: _.template("<% for (var i in fields) { %> <li><%= fields[i] %><div></div></li> <% } %>"),
	fields: [{ prop: 'BackgroundColor', name: 'Background', type: 'color'}, {prop: 'Color', name: 'Color', type: 'color'}, {prop: 'Padding', name: 'Padding', type:'slider'}],
	selectors: ['h1', 'h2'],
	selectorFields: { },
	redraw: function() {
		
		var colors = { }
		
		
		var parser = new(less.Parser)({
		
		});
		
		parser.parse('@color: "red"; .class { width: 1 + 1; color: @color; }', function (e, tree) {
			log(e, tree);
			log(tree.toCSS({}, {}));
		});
		
		
		
	},
	colorpickerOptions: {
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).data("val", hex).css("background-color", '#' + hex);
			$(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor($(this).data("val") || '000');
		}
	},
	init: function() {
		for (var i = 0; i < template.fields.length; i++) {
			var type = template.fields[i].type;
			var name = template.fields[i].name;
			var prop = template.fields[i].prop;
			
			for (var j = 0; j < template.selectors.length; j++) {
				template.selectorFields[template.selectors[j] + '' + prop] = 'inherit';
			}
			
			if (type == 'slider') {
				$("<li>" + name + "<div></div></li>").appendTo("#slides-global").find("div").slider();
			}
			else if (type == 'color') {
				$("<li>" + name + "<div class='colorselector-container'></div></li>").appendTo("#slides-global").ColorPicker(template.colorpickerOptions);
			}
		}
		
	}
};
