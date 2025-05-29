var sangupta = {};

/**
 * Used to merge hogan.js template with data
 */
function mergeHoganTemplate() {
	var template = $('#hoganTemplate').val();
	template = $.trim(template);

	var json = $('#jsonData').val();
	json = $.trim(json);
	json = $.parseJSON(json);

	if(!template) {
		return;
	}

	if(sangupta.hogan) {
		// just merge
		var compiled = Hogan.compile(template);
		var html = compiled.render(json);

		// put this in iframe
		$('#hoganFrame').contents().find('html').html(html);
		return;
	}

	// get the script and merge
	$.getScript('http://twitter.github.io/hogan.js/builds/3.0.1/hogan-3.0.1.js', function() {
		// set that we have loaded hogan
		sangupta.hogan = true;

		var compiled = Hogan.compile(template);
		var html = compiled.render(json);

		// put this in iframe
		$('#hoganFrame').contents().find('html').html(html);
	});
}

/**
 * Format the pasted JSON
 */
function formatJSON() {
	var json = $('#jsonData').val();
	json = $.trim(json);
	json = $.parseJSON(json);
	
	json = JSON.stringify(json, null, 4);
	$('#jsonData').val(json);
}
