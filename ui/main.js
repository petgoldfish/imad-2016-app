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

// Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit-btn');
submit.onclick = function() {
	// Make a req to server and send name
	// Capture a list and render
	var names = ['name1', 'name2', 'name3', 'name4'];
	var list = '';
	for(var i = 0; i < names.length; i++) {
		list += '<li>' + names[i] + '</li>'
	}
	var ul = document.getElementById('namelist');
	ul.innerHTML = list;
}; 