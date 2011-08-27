var CSS_SKELETOR = ' h1 { padding: @h1Padding; border: solid 2px red; border-radius: @h1BorderRadius; background-color: @h1BackgroundColor; color: @h1Color;  } ';


var template = {
	slider: _.template("<% for (var i in fields) { %> <li><%= fields[i] %><div></div></li> <% } %>"),
	fields: [
	
		{ prop: 'BackgroundColor', name: 'Background', type: 'color'}, 
		{ prop: 'Color', name: 'Color', type: 'color'}, 
		{ prop: 'Padding', name: 'Padding', type:'slider', min: 0, max: 20 },
		{ prop: 'BorderRadius', name: 'Radius', type:'slider' }
	],
	selectors: ['h1', 'h2'],
	selectorFields: { },
	redraw: function() {
		var colors = { }
		var parser = new(less.Parser)({ });
		var variables = [];
		for (var i in template.selectorFields) {
			variables.push("@" + i + ": " + template.selectorFields[i] + ";");
		}
		
		log(JSON.stringify(template.selectorFields));
		var fullCSS = variables.join('\n') + CSS_SKELETOR;
		
		parser.parse(fullCSS, function (e, tree) {
			$("#styles").html(tree.toCSS());
		});
	},
	colorpickerOptions: {
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).ColorPickerHide();
		},
		onChange: function(hsb, hex, rgb, el) {
			log("CHANGE", arguments, this)
			$(el).data("val", hex).css("background-color", '#' + hex);
			
			var fieldInd = parseInt($(el).data("field"));
			template.selectorFields[template.selectors[0] + "" + template.fields[fieldInd].prop] = '#' + hex;
			template.redraw();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor($(this).data("val") || '000');
		}
	},
	sliderOptions: {
		slide: function(e, ui) {
			var fieldInd = parseInt($(e.target).data("field"));
			template.selectorFields[template.selectors[0] + "" + template.fields[fieldInd].prop] = ui.value + 'px';
			template.redraw();
		}
	},
	init: function() {
		var container = $("#template-controls");
		for (var i = 0; i < template.fields.length; i++) {
			var type = template.fields[i].type;
			var name = template.fields[i].name;
			var prop = template.fields[i].prop;
			var field = template.fields[i];
			
			
			for (var j = 0; j < template.selectors.length; j++) {
				template.selectorFields[template.selectors[j] + '' + prop] = 'inherit';
			}
			
			if (type == 'slider') {
				$("<li>" + name + "<br /><div class='control-container'><div class='control' data-field='"+i+"'></div></div></li>").appendTo(container).find(".control").slider($.extend({},template.sliderOptions, { min: field.min || 0, max: field.max || 40 }
				
				));
			}
			else if (type == 'color') {
				$("<li>" + name + "<br /><div class='control-container'><div data-field='"+i+"' class='control colorselector-container'></div></div></li>").appendTo(container).find(".control").ColorPicker(template.colorpickerOptions);
			}
		}
		
		template.redraw();
		
	}
};
