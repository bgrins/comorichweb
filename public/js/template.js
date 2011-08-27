var CSS_SKELETOR = 'h1 { padding: @h1Padding; border-radius: @h1BorderRadius; background-color: @h1BackgroundColor; color: @h1Color; border-color: @h1BorderColor; border-width: @h1BorderWidth; border-style: solid; font-size: @h1FontSize;  } ' + 
'h2 { padding: @h2Padding; border-radius: @h2BorderRadius; background-color: @h2BackgroundColor; color: @h2Color; border-color: @h2BorderColor; border-width: @h2BorderWidth; border-style: solid; font-size: @h2FontSize;  } ' + 
'h3 { padding: @h3Padding; border-radius: @h3BorderRadius; background-color: @h3BackgroundColor; color: @h3Color; border-color: @h3BorderColor; border-width: @h3BorderWidth; border-style: solid; font-size: @h3FontSize;  } ' +
'pre { padding: @prePadding; border-radius: @preBorderRadius; background-color: @preBackgroundColor; color: @preColor; border-color: @preBorderColor; border-width: @preBorderWidth; border-style: solid; font-size: @preFontSize;  } ' +
'code { padding: @codePadding; border-radius: @codeBorderRadius; background-color: @codeBackgroundColor; color: @codeColor; border-color: @codeBorderColor; border-width: @codeBorderWidth; border-style: solid; font-size: @codeFontSize;  } ' +
'cite { padding: @citePadding; border-radius: @citeBorderRadius; background-color: @citeBackgroundColor; color: @citeColor; border-color: @citeBorderColor; border-width: @citeBorderWidth; border-style: solid; font-size: @citeFontSize;  } '
;


var template = {
	fields: [
		{ prop: 'BackgroundColor', name: 'Background', type: 'color'},
		{ prop: 'Color', name: 'Color', type: 'color'}, 
		{ prop: 'BorderColor', name: 'Border Color', type: 'color'}, 
		{ prop: 'BorderWidth', name: 'Border Width', type: 'slider'}, 
		{ prop: 'BorderRadius', name: 'Rounded', type:'slider' },
		{ prop: 'Padding', name: 'Padding', type:'slider', min: 0, max: 20, 'unit': '%' },
		{ prop: 'FontSize', name: 'Font Size', type:'slider', min: 50, max: 800, 'unit': 'em', 'divide': 100 },
	],
	activeselector: null,
	selectors: [],
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
			var field = template.fields[fieldInd];
			template.selectorFields[template.activeselector + "" + field.prop] = '#' + hex;
			template.redraw();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor($(this).data("val") || '000');
		}
	},
	sliderOptions: {
		slide: function(e, ui) {
			var fieldInd = parseInt($(e.target).data("field"));
			var field = template.fields[fieldInd];
			
			template.selectorFields[template.activeselector + "" + field.prop] = (ui.value / field.divide) + field.unit;
			template.redraw();
		}
	},
	init: function() {
		var container = $("#template-controls");
		
		template.selectors = $(".editor").map(function() {
			return $(this).data("selector");
		}).toArray();
		
		$(".editor").click(function() {
			$(".editor.active").removeClass("active");
			$(this).addClass('active');
			template.activeselector = $(this).data("selector");
		}).first().click();
		
		for (var i = 0; i < template.fields.length; i++) {
			var field = template.fields[i];
			
			field.min = field.min || 0;
			field.max = field.max || 40;
			field.unit = field.unit || 'px';
			field.divide = field.divide || 1;
			
			
			var type = field.type;
			var name = field.name;
			var prop = field.prop;
			
			for (var j = 0; j < template.selectors.length; j++) {
				template.selectorFields[template.selectors[j] + '' + prop] = 'inherit';
			}
			
			if (type == 'slider') {
				var opts = $.extend({ },template.sliderOptions, { min: field.min, max: field.max });
				
				
				$("<li>" + name + "<br /><div class='control-container'><div class='control' data-field='"+i+"'></div></div></li>").
					appendTo(container).find(".control").slider(opts);
			}
			else if (type == 'color') {
				$("<li>" + name + "<br /><div class='control-container'><div data-field='"+i+"' class='control colorselector-container'></div></div></li>").appendTo(container).find(".control").ColorPicker(template.colorpickerOptions);
			}
		}
		
		template.redraw();
		
	}
};
