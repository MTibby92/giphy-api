var topics = ['English Premier League', 'World Cup Soccer', 'NBA', 'NFL']
var domain = 'http://api.giphy.com/v1/gifs/search?'
var key = 'dc6zaTOxFJmzC'
var userInput;
var query = {
	q: 'funny',
	limit: 10,
	rating: 'pg',
	api_key: key
}

function createButtons(arr) {
	for (i in arr) {
		var button = $('<button>').attr('class', 'btn btn-primary')
		$(button).html(arr[i])
		$('#gifButtons').append(button)
	}
}

function getGIFS() {
	$.ajax({url: domain, method: 'GET', data: query})
	.done(function(response) {
		for (i in response.data) {
			var selector = '#number'
			selector = selector.concat(parseInt(i)+1)
			console.log(selector)
			var fixedUrl = response.data[i].images.original_still.url
			var animateURL = response.data[i].images.original.url
			var rating = response.data[i].rating
			var img = $('<img>').attr({
				src: fixedUrl,
				animateURL: animateURL,
				fixedURL: fixedUrl,
				status: 'fixed'
			})
			$(selector).prepend(img)
		}
	})
}


$(document).ready(function() {
	createButtons(topics)
	getGIFS()
})