
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
	template: _.template("<% _.each(slides, function(s) { %> <li><%= s.content %></li> <% }); %> </li>"),
	init: function() {

		$("#add").click(function() {
			slides.add();
		});
		$("#sync").click(function() {
			slides.sync();
		});
		
		$("#slides-collection").delegate("li", "click", function() {
			//slides.activate()
		});
	},
	add: function() {
		slides.collection.push({ content: 'hi' });
		
		$("#slides-collection").html(slides.template({ slides: slides.collection })).sortable("destroy").sortable();
		
		
	},
	sync: function() {
		alert(slides.template({ slides: slides.collection }))
	}
	
};

$(function() {
	slides.init();
	general.init();
});