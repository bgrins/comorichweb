
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
		var slides = $("#slides-content");
		var m = parseInt(slides.css("margin-bottom")) + 10;
		slides.height(fullHeight - slides.offset().top - m);
		
		var collection = $("#slides-collection");
		collection.height(fullHeight - collection.offset().top - m);
	},
	saving: false,
	save: function() {
		general.saving = true;
		$("#save").addClass("ui-state-disabled");
        $.post('/slide/update', { deckid: deck.data._id, slides: slides.collection }, function() {
            log('updated', arguments);
        });

        $.post("/deck/update", { deckid : deck.data._id, title: deck.data.title }, function() {
            log("updated", arguments);
        });
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
		
		$("#remove").button({
            icons: { primary: "ui-icon-close" },
            text: false
        }).click(function() {
			slides.remove();
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
        general.save();
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
	remove: function() {
        $.post("/slide/delete", { deckid : deck.data._id, slideid : slides.active._id }, function(data){
            var idx = slides.collection.indexOf(slides.active);
            slides.collection = _.reject(slides.collection, function(slide) {
                return slide._id == slides.active._id;
            });

            idx = (idx > slides.collection.length - 1) ? slides.collection.length - 1 : idx;

            slides.activate(slides.collection[idx]);
            slides.redraw();
        });
	},
	add: function() {
		$.post('/slide/create', { deckid : deck.data._id, content: "<h2>Slide Title</h2>" },  function(data) {
			var newslide = data;
            slides.collection.push(newslide);
            slides.remap();
            slides.activate(newslide);
		});
	},
	sync: function() {
		alert(slides.template({ slides: slides.collection }))
	}
	
};

var deck = {
	data: { title: 'Untitled' },
	init: function() {
	
		$("#rename").button({
            icons: { primary: "ui-icon-pencil" },
            text: false
        }).click(function() {
			deck.data.title = prompt("Enter a title", deck.data.title + "") || deck.data.title;
			deck.render();
			general.save();
		});
		
		deck.render();
	},
	render: function() {
		log("here", deck.data.title)
		$("#deck-title h3").text(deck.data.title);
	}	
};


var viewsource = {
	editor: null,
	init: function() {
		viewsource.editor = ace.edit("slide-source");
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


var app = {
	init: function() {
	general.init();
	viewsource.init();
	slides.init();
	deck.init();
	
	
	
	}
};
