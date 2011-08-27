
var general = {
	init: function() {
		$(window).bind("resize", general.resize);
		general.resize();
		$("#tabs").tabs();
		slides.collection = _LOADED_SLIDES || [];
		deck.data = _LOADED_DECK || { };
		
		
		$("#save").button({icons: { primary: "ui-icon-check" } }).click(function() {
			general.save();
		});
		
	},
	resize: function() {
		var fullHeight = $(window).height();
		var slides = $("#slides");
		slides.height(fullHeight - slides.offset().top);
		
		var collection = $("#slides-collection");
		collection.height(fullHeight - collection.offset().top);
	},
	saving: false,
	save: function() {
		general.saving = true;
		/*
		$("#save").addClass("ui-state-disabled");
		$.ajax({
			url:  '/slide/update', 
			method: 'post',
			data: {
				slides: slides.collection
			},
			success: function() {
				log("updated", arguments);
			},
			complete: function() {
				general.saving = false;
				$("#save").removeClass("ui-state-disabled");
			}
		});*/
	}
};

var slides = {
	collection: [],
	active: {},
	nextSort: 0,
	template: _.template("<% _.each(slides, function(s, i) { %> <li id='slide_<%= s._id %>' data-id='<%= s._id %>'><%= s.content %></li> <% }); %> </li>"),
	obj: { },
	init: function() {

		$("#add").button().click(function() {
			slides.add();
		});
		
		$("#slides-collection").delegate("li", "click", function() {
			var id = $(this).data("id");
			slides.activate(slides.obj[id]);
		});
		
		viewsource.onchange = function(val) {
			slides.active.content = val;
			slides.active.isDirty = true;
			slides.redraw();
			
		};
			
		if (slides.collection.length == 0) {
			slides.add();
		}
		else {
			slides.activate(slides.collection.sort(slides.orderSort)[0])
		}
		
		slides.remap();
		slides.redraw();
		
	},
	activate: function(slide) {
		slides.active = slide;
		$("#right").addClass("editing");
		viewsource.set(slide.content);
	},
	orderSort: function(a, b) {
		return a.sort - b.sort;
	},
	redraw: function() {
		$("#slides-collection").
			html(slides.template({ slides: slides.collection.sort(slides.orderSort) })).
			sortable("destroy").sortable({
				stop: function() {
					var allslides = $("#slides-collection li");
					allslides.each(function(i) {
						slides.obj[$(this).data("id")].sort = i;
					});
					
					slides.nextSort = allslides.length;
				}
			});
			
		$("#slides-collection li.active").removeClass("active");
		$("#slide_" + slides.active._id).addClass("active");
	
	},
	remap: function() {
		slides.obj = { };
		for (var i = 0; i < slides.collection.length; i++) {
			slides.obj[slides.collection[i]._id] = slides.collection[i];
		}
	},
	add: function() {
		$.post('/slide/create', function(data) {
			log(data);
			
		});
		
		var newslide = { content: 'slide content', id: (new Date().getTime()), sort: slides.nextSort++ }
		slides.collection.push(newslide);
		slides.remap();
		slides.activate(newslide);
	},
	sync: function() {
		alert(slides.template({ slides: slides.collection }))
	}
	
};

var deck = {
	data: { title: 'Untitled' },
	init: function() {
		$("#rename").button({
            icons: { primary: "ui-icon-locked" },
            text: false
        }).click(function() {
			deck.title = prompt("Enter a title", deck.data.title + "") || deck.data.title;
			deck.render();
		});
		deck.render();
		

	},
	render: function() {
		$("#title h3").text(deck.data.title);
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
	deck.init();	
});
