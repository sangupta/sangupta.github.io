function getProjectList() {
	var uri = "https://api.github.com/users/sangupta/repos?per_page=200";

	$.getJSON(uri, function (result) {
		if(!result || result.length == 0) {
			return;
		}

		addRepos("#projectList", result);
	});
};

function addRepos(selector, repos) {
	var parent = $(selector);
	parent.html('');

	$.each(repos, function(index, repo) {
		addRepo(repo, parent);
	});
};

function addRepo(repo, parent) {
	var $item = $("<li>");
	var $name = $("<a>").attr("href", repo.html_url).text(repo.name);
    $item.append($("<span>").addClass("name").append($name));

	$item.appendTo(parent);
}
