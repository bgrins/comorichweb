


var slides = {
	collection: [],
	template: _.template("<ul> <% _.each(slides, function(s) { %> <li><%= s.content %></li> <% }); %> </ul>"),
	init: function() {
		$().appendTo("body");

		$("#add").click(function() {
			slides.add();
		});
		$("#sync").click(function() {
			slides.sync();
		});
	},
	add: function() {
		slides.collection.push({ content: 'hi' });
		
		
	},
	sync: function() {
		alert(slides.template({ slides: slides.collection }))
	}
	
};

$(function() {
	slides.init();
});