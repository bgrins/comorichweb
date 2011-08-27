
var general = {
	init: function() {
		$(window).bind("resize", general.resize);
		general.resize();
	},
	resize: function() {
		$("#slides").height($(document).height())
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
		
		$("#slide-content").change(function() {
			slides.active.content = $(this).val();
			slides.redraw();
		});
		
		$("#top button").button();
	
		if (slides.collection.length == 0) {
			slides.add();
		}	
	},
	activate: function(slide) {
		slides.active = slide;
		$("#right").addClass("editing");
		$("#slide-content").val(slide.content);
	},
	redraw: function() {
		$("#slides-collection").
			html(slides.template({ slides: slides.collection })).
			sortable("destroy").sortable();
	
	},
	add: function() {
		slides.collection.push({ content: 'slide content', id: (new Date().getTime()) });
		slides.redraw();
	},
	sync: function() {
		alert(slides.template({ slides: slides.collection }))
	}
	
};

$(function() {
	slides.init();
	general.init();
});