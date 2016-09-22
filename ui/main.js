// Counter code
var button = document.getElementById('counter');

button.onclick = function () {

	// Create request
	var request = new XMLHttpRequest();
	// Capture response into a var
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				var counter = request.responseText;
				var span = document.getElementById('count');
				span.innerHTML = counter.toString();
			}
		}
	};
	// Make a request
	request.open('GET', 'http://http://petgoldfish.imad.hasura-app.io/counter', true);
	request.send(null);
};

// Submit name
var submit = document.getElementById('submit-btn');
submit.onclick = function () {

	// Create request
	var request = new XMLHttpRequest();
	// Capture response into a var
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				// Capture a list and render
				var names = request.responseText;
				names = JSON.parse(names);
				var list = '';
				for (var i = 0; i < names.length; i++) {
					list += '<li>' + names[i] + '</li>';
				}
				var ul = document.getElementById('namelist');
				ul.innerHTML = list;
			}
		}
	};

	var nameInput = document.getElementById('name');
	var name = nameInput.value;
	// Make a request
	request.open('GET', 'http://petgoldfish.imad.hasura-app.io/submit-name?name=' + name, true);
	request.send(null);
}; 