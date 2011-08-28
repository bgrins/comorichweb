
var template = {
	resize: function() {
		var frame = $("#preview-frame");
		var m = 30;
		frame.height($(window).height() - frame.offset().top - m)
	},
	tags: [],
	fields: [
		{ prop: 'backgroundcolor', name: 'Background', type: 'color'},
		{ prop: 'color', name: 'Color', type: 'color'}, 
		{ prop: 'bordercolor', name: 'Border Color', type: 'color'}, 
		{ prop: 'borderwidth', name: 'Border Width', type: 'slider'}, 
		{ prop: 'borderradius', name: 'Rounded', type:'slider' },
		{ prop: 'padding', name: 'Padding', type:'slider', min: 0, max: 20, 'unit': '%' },
		{ prop: 'fontsize', name: 'Font Size', type:'slider', min: 50, max: 800, 'unit': 'em', 'divide': 100 },
	],
	EJS: false,
	activeselector: null,
	loadedTemplates: [],
	redraw: function() {
		log("REDRAW", template.tags);
		if (template.EJS) {
			$(template.styleTag).html(template.EJS.render({tags: template.tags}));
			log("RENDERIGN", $(template.styleTag).html(), template.tags);
		}
	},
	colorpickerOptions: {
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).ColorPickerHide();
		},
		onChange: function(hsb, hex, rgb, el) {
			$(el).data("val", hex).css("background-color", '#' + hex);
			
			var fieldInd = parseInt($(el).data("field"));
			var field = template.fields[fieldInd];
			
			var activeTag = template.getActiveTag();
			if (activeTag) {
				activeTag[field.prop] = '#' + hex;
			}
			
			template.redraw();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor($(this).data("val") || '000');
		}
	},
	getActiveTag: function() {
		for (var i = 0, j = template.tags.length; i < j; i++) {
			if (template.activeselector == template.tags[i].name) {
				log("matched", template.activeselector);
				return template.tags[i];
			}
		}
	},
	sliderOptions: {
		slide: function(e, ui) {
			var fieldInd = parseInt($(e.target).data("field"));
			var field = template.fields[fieldInd];
			
			
			var activeTag = template.getActiveTag();
			if (activeTag) {
				activeTag[field.prop] = (ui.value / field.divide) + field.unit;
			}
			
			template.redraw();
		}
	},
	deckChange: function(to) {
		$("body").toggleClass("edittemplate", to >= 1);
		
		
		var controls = $("#template-controls-container");
		if (to >= 1 && !controls.data("moved")) {
			controls.offset({top: 169, left: 183 });
			controls.data("moved", true);
		}
	},
	onEditorClicked: function(selector) {
		template.activeselector = selector;
		if (!template.tags[selector]) {
			template.tags.push({ name: selector });
		}
	},
	onFrameLoaded: function(styleTag) {
		template.styleTag = styleTag;
	},
	onTemplateClicked: function(i) {
		if (template.loadedTemplates[i]) {
			template.tags = template.loadedTemplates[i].slice(0);
			template.redraw();
		}
		log("HER", i, template.loadedTemplates[i])
	},
	init: function() {
		var container = $("#template-controls");
		
		log("Here", $("#deck-create"), $("#deck-create").length)
		
		template.loadedTemplates = LOADED_TEMPLATES;
		
		$("#deck-create").button();
		
		$("#template-controls-container").draggable({
			containment: "body",
			handle: ".ui-widget-header",
			drag: function() {
				$(this).data("moved", true);
			}
		});
		
		for (var i = 0; i < template.fields.length; i++) {
			var field = template.fields[i];
			
			field.min = field.min || 0;
			field.max = field.max || 40;
			field.unit = field.unit || 'px';
			field.divide = field.divide || 1;
			
			
			var type = field.type;
			var name = field.name;
			var prop = field.prop;
			
			if (type == 'slider') {
				var opts = $.extend({ },template.sliderOptions, { min: field.min, max: field.max });
				
				
				$("<li class='clearfix'><span class='control-name'>" + name + "</span><div class='control-container slider'><div class='control' data-field='"+i+"'></div></div></li>").
					appendTo(container).find(".control").slider(opts);
			}
			else if (type == 'color') {
				$("<li class='clearfix'><span class='control-name'>" + name + "</span><div class='control-container picker'><div data-field='"+i+"' class='control colorselector-container'></div></div></li>").appendTo(container).find(".control").ColorPicker(template.colorpickerOptions);
			}
		}
		
		
		template.redraw();
		
		$(window).resize(template.resize);
		template.resize();
		

        template.EJS = new EJS({text: $("#horribleejs").html()});
        
	}
};
