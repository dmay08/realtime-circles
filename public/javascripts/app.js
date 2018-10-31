// added this line
var socket = io(); // connect / create 'channel of communications'

// added this (LISTENING, not yet EMITTING)
socket.on('add-circle', function(data) { // '.on' LISTENS (vs. 'emit()' = SENDS messages)
  addCircle(data); // pass just the object (data) b/c we named the fields the same as the originnal function (lines 40-49)
}); 

// added this (LISTENING) > then performs function
socket.on('clear-display', function() {
  circles.innerHTML = '';
});

var circles = document.getElementById('circles');
var initials = '';

circles.addEventListener('click', function(evt) {
// added this (EMITTING now)
  socket.emit('add-circle', {
    initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10,125),
    rgba: getRandomRGBA()
  });
  // addCircle(evt.clientX, evt.clientY, randomBetween(10,125), getRandomRGBA());
});

// clears the board
document.getElementsByTagName('button')[0].addEventListener('click', function() {
  // added this (EMITTING now)
  socket.emit('clear-display'); // now we EMIT 'clear-display' message (which is LISTENED TO @ line 10);
  // circles.innerHTML = '';
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);

function getInitials() {
  var input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

// x & y match clientX & clientY (line 5) - also added 'initials' for line 7
function addCircle({ x, y, dia, rgba, initials }) { // dia = diameter of circle 
  var el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
    randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
}
