var ws;
var sId;
var keyMap = [];
var ships = [];
var object = function() {
  this.data = {
    'icon': null,
    'sizeX': null,
    'sizeY': null,
    'vLoss': 0
  };
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.draw = function(x, y) {
    this.x = x;
    this.y = y;
    this.selfI = document.createElement("div");
    this.selfI.style.width = this.data.sizeX;
    this.selfI.style.height = this.data.sizeY;
    this.selfI.style.position = 'absolute'
    this.selfI.style.top = this.y + 'px';
    this.selfI.style.left = this.x + 'px';
    this.selfI.style.webkitTransform = "rotate("+-90+"deg)";
    document.body.appendChild(this.selfI);
    this.img = document.createElement("img");
    this.img.src = this.data.icon;
    this.img.style.width = this.data.sizeX;
    this.img.style.height = this.data.sizeY;
    this.selfI.appendChild(this.img);
  };
  this.remove = function(){
    document.body.removeChild(this.selfI);
  };
  this.move = function(x, y, type) {
    this.x = (type) ? (this.x + x): x;
    this.y = (type) ? (this.y + y): y;
    this.selfI.style.top = this.y + 'px';
    this.selfI.style.left = this.x + 'px';
  };
  this.rotate = function(r, type) {
    this.r = (type) ? (this.r + r): r;
    this.selfI.style.webkitTransform = "rotate("+(this.r-90)+"deg)";
    return this.r;
  };
  this.vSet = function(power) {
    this.vx += power*Math.cos(this.r*0.0174533);
    this.vy += power*Math.sin(this.r*0.0174533);
  };
  this.velocity = function() {
    this.vx = this.vx- this.data.vLoss;
    this.vy = this.vy- this.data.vLoss;
    this.move(this.vx, this.vy, true);
  };
};
//
var SpaceShip = function() {
  object.call(this);
  this.data.icon = 'http://opengameart.org/sites/default/files/styles/watermarked/public/spaceship1_1.png';
  this.data.sizeX = '60px';
  this.data.sizeY = '60px';
};
function wsOpen(){
  ws = new WebSocket('ws://achex.ca:4010');
  ws.onmessage = function(evt){
    var st_received_message = evt.data;
    console.log('Received:'+ st_received_message);
    var received_message = JSON.parse(st_received_message);
    if (received_message.onReceive != undefined) {
      	received_message.onReceive();
    }
    if (received_message.SID != undefined) {
      sId = received_message.SID;
    }
  };
  ws.onclose = function(evt){
    console.log('Diconnected');
  };
  ws.onerror = function(evt){
    console.log('Error');
  };
  ws.onopen = function(evt){
    console.log('Connected');
    ws.send('{"setID":"Spaceship-Game-Sv1","passwd":"50-61-74-72-69-63-6b"}');
  };
}
setTimeout(wsOpen,500);
var send = function(onReceive){
  var message = {};
  message.to = "Spaceship-Game-Sv1";
  message.onReceive = onReceive;
  message = JSON.stringify(message);
	ws.send(message);
}
var main = function()  {
  if (keyMap[38]) {ship.vSet(.01)}
  if (keyMap[39]) {ship.rotate(1, true)}
  if (keyMap[40]) {}
  if (keyMap[37]) {ship.rotate(-1, true)}
};
onkeydown = onkeyup = function(e){
  e = e || event; // to deal with IE
  keyMap[e.keyCode] = e.type == 'keydown';
  //console.log(map);
};
