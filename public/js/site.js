
$(function() {
	var expand = $("#login"),
		expanded = $("#site-top .expanded"),
		login = $("#login");
	
	if (expand.hasClass("in")) { return; }
	
	
	expand.click(function(e) {
		expanded.toggleClass("show");
		login.toggleClass("open");
		
		return false;
	});
	expanded.click(function(e) {
		if (!$(e.target).is("a")) {
			return false;
		}
	});
	
	$(document).click(function() {
		expanded.removeClass("show");
		login.removeClass("open");
	});
});