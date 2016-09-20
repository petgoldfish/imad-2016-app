console.log('Loaded!');

// change the main text element
var element = document.getElementById('main-text');

element.innerHTML = 'Click on Madi and see what happens!';

// change the pic to jump on mouse click
var imgelement = document.getElementById('madi');
var marginleft = 0;
imgelement.onclick = function() {
    function moveRight() {
        marginleft = marginleft + 1;
        imgelement.style.marginLeft = marginleft + 'px';
    }
    var interval = setInterval(moveRight, 50);
};