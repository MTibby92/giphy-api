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
			var imgSelector = '#number'
			var ratingSelector = '#rating'
			imgSelector = imgSelector.concat(parseInt(i)+1)
			ratingSelector = ratingSelector.concat(parseInt(i)+1)
			console.log(imgSelector)
			console.log(ratingSelector)
			var fixedUrl = response.data[i].images.original_still.url
			var animateUrl = response.data[i].images.original.url
			var rating = response.data[i].rating
			var img = $('<img>').attr({
				src: fixedUrl,
				animateUrl: animateUrl,
				fixedUrl: fixedUrl,
				status: 'fixed'
			})
			$(imgSelector).prepend(img)
			$(ratingSelector).html(rating)
		}
		$('img').on('click', toggleGIF)
	})
}

function toggleGIF() {
	console.log('toggleGIF initiated')
	var status = $(this).attr('status')
	var ani = $(this).attr('animateUrl')
	var fix = $(this).attr('fixedUrl')
	if (status == 'fixed') {
		$(this).attr('src', ani)
		$(this).attr('status', 'animated')
	}
	else if (status == 'animated') {
		$(this).attr('src', fix)
		$(this).attr('status', 'fixed')
	}else {
		console.log('Unexpected error in toggleGIF()')
	}
}


$(document).ready(function() {
	createButtons(topics)
	getGIFS()
})