
var general = {
	init: function() {
		$(window).bind("resize", general.resize);
		general.resize();
		
		$("#tabs").tabs();
	},
	resize: function() {
		var slides = $("#slides");
		slides.height($(document).height() - slides.offset().top)
	}
};

var slides = {
	collection: [],
	template: _.template("<% _.each(slides, function(s, i) { %> <li data-id='<%= s.id %>'><%= s.content %></li> <% }); %> </li>"),
	init: function() {

		$("#add").click(function() {
			slides.add();
		});
		$("#sync").click(function() {
			slides.sync();
		});
		
		$("#slides-collection").delegate("li", "click", function() {
			var id = $(this).data("id");
			for (var i = 0; i < slides.collection.length; i++) {
				if (slides.collection[i].id == id) {
					slides.activate(slides.collection[i]);
				}	
			}
		});
		
		viewsource.onchange = function(val) {
			slides.active.content = val;
			slides.redraw();
		};
		
		$("#top button").button();
	
		if (slides.collection.length == 0) {
			slides.add();
		}	
	},
	activate: function(slide) {
		slides.active = slide;
		$("#right").addClass("editing");
		viewsource.set(slide.content);
	},
	redraw: function() {
		$("#slides-collection").
			html(slides.template({ slides: slides.collection })).
			sortable("destroy").sortable();
	
	},
	add: function() {
		var newslide = { content: 'slide content', id: (new Date().getTime()) }
		slides.collection.push(newslide);
		slides.activate(newslide);
	},
	sync: function() {
		alert(slides.template({ slides: slides.collection }))
	}
	
};

var viewsource = {
	editor: null,
	init: function() {
		viewsource.editor = ace.edit("slide-content");
    	viewsource.editor.setTheme("ace/theme/textmate");
    	var HtmlMode = require("ace/mode/html").Mode;
    	viewsource.editor.getSession().setMode(new HtmlMode());
    	
    	viewsource.editor.getSession().on('change', function(val) {
    		if (viewsource.onchange) {
    			viewsource.onchange(viewsource.get());
    		}		
    	});
	},
	set: function(val) {
		viewsource.editor.getSession().setValue(val);
	},
	get: function(val) {
		return viewsource.editor.getSession().getValue();
	}
};

$(function() {
	general.init();
	viewsource.init();
	slides.init();
	
});