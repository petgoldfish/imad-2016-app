// Counter code
var button = document.getElementById('counter');

button.onclick = function () {

	// Create request
	var request = new XMLHttpRequest();
	// Capture response into a var
	request.onreadystatechange = function() {
		if(request.readyState === XMLHttpRequest.DONE) {
			if(request.status === 200) {
				var counter = request.responseText;
				var span = document.getElementById('count');
				span.innerHTML = counter.toString();
			}
		}
	};
	// Make a request
	request.open('GET', 'http://petgoldfish.imad.hasura-app.io/counter', true);
	request.send(null);
};