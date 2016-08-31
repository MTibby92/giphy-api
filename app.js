var topics = ['English Premier League', 'World Cup Soccer', 'NBA', 'NFL']
var domain = 'https://api.giphy.com/v1/gifs/search?'
var key = 'dc6zaTOxFJmzC'
//var userInput;
var query = {
	q: undefined, //'funny',
	limit: 10,
	rating: 'pg',
	api_key: key
}

function createButtons(arr) {
	for (i in arr) {
		var button = $('<button>').attr('class', 'btn btn-primary search')
		$(button).html(arr[i])
		$('#gifButtons').append(button)
	}
}

function getGIFS() {
	$('.thumbnail').show()
	for (var i=0; i<10; i++) {
		var imgSelector2 = '#number'
		var ratingSelector2 = '#rating'
		imgSelector2 = imgSelector2.concat(parseInt(i)+1)
		ratingSelector2 = ratingSelector2.concat(parseInt(i)+1)

		if($(imgSelector2).children().length > 1) {
			console.log('met criteria for removal')
			$('.gifImg:first').remove()
		}
	}

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
				status: 'fixed',
				class: 'gifImg'
			})
			$(imgSelector).prepend(img)
			$(ratingSelector).html(rating)
		}
		$('img').on('click', toggleGIF)

		//code for removing duplicates; doesn't really work
		// for (var i=0; i<10; i++) {
		// 	var imgSelector2 = '#number'
		// 	var ratingSelector2 = '#rating'
		// 	imgSelector2 = imgSelector2.concat(parseInt(i)+1)
		// 	ratingSelector2 = ratingSelector2.concat(parseInt(i)+1)

		// 	if($(imgSelector2 + ' img').length > 1) {
		// 		console.log('met criteria for removal')
		// 		$('.gifImg:first').remove()
		// 	}
		// }
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

function newButton() {
	var newBtn = $('<button>').attr('class', 'btn btn-primary search')
	$(newBtn).html($('#searchBar').val())
	newBtn.click(function(event) {
		query.q = $(event.target).html()
		$('.caption').show()
		getGIFS()
		query.q = undefined
	})
	$('#gifButtons').append(newBtn)
	$('#searchBar').val('')
}

$(document).ready(function() {
	$('.thumbnail').hide()
	$('.caption').hide()
	createButtons(topics)

	$('#searchBar').keydown(function(event){    
	    if(event.keyCode==13){
	       $('#searchBtn').trigger('click')
	    }
	})

	$('#searchBtn').click(newButton)

	$('.search').on('click', function(event) {
		query.q = $(event.target).html()
		$('.caption').show()
		getGIFS()
		query.q = undefined
	})
})