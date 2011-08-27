
var general = {
	init: function() {
		$(window).bind("resize", general.resize);
		general.resize();
		
		$("#tabs").tabs();
		
		
	},
	resize: function() {
		var fullHeight = $(window).height();
		var slides = $("#slides");
		slides.height(fullHeight - slides.offset().top);
		
		var collection = $("#slides-collection");
		collection.height(fullHeight - collection.offset().top);
	}
};

var slides = {
	collection: [],
	template: _.template("<% _.each(slides, function(s, i) { %> <li data-id='<%= s.id %>'><%= s.content %></li> <% }); %> </li>"),
	init: function() {

		$("#add").button().click(function() {
			slides.add();
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

var deck = {
	init: function() {
		$("#rename").button({
            icons: { primary: "ui-icon-locked" },
            text: false
        }).click(function() {
			deck.title = prompt("Enter a title", deck.title + "") || deck.title;
			deck.render();
		});
		deck.render();
		
		
		$("#save").button({icons: { primary: "ui-icon-check" } });

	},
	render: function() {
		$("#title h3").text(deck.title);
	},
	title: 'Untitled'
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
	deck.init();	
});
