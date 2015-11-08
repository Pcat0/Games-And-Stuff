var ws;
var sId;
var keyMap = [];
var ships = [];
var lasers = [];
var myLasers = [];
var lsDe = 0;
var object = function() {
  this.data = {
    'icon': undefined,
    'sizeX': undefined,
    'sizeY': undefined,
    'vLoss': 0,
    'rOffset': 0,
    'maxAge': undefined
  };
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.age = 0;
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
    this.selfI.style.webkitTransform = "rotate("+(this.r + this.data.rOffset)+"deg)";
    return this.r;
  };
  this.vSet = function(power) {
    this.vx += power*Math.cos(this.r*0.0174533);
    this.vy += power*Math.sin(this.r*0.0174533);
  };
  this.tick = function() {
    this.vx = this.vx- this.data.vLoss;
    this.vy = this.vy- this.data.vLoss;
    this.move(this.vx, this.vy, true);
    this.age++;
    if (this.age >= this.data.maxAge && this.data.maxAge != undefined){
    	return true;
    }
  };
};
//
var SpaceShip = function() {
  object.call(this);
  this.data.icon = 'http://opengameart.org/sites/default/files/styles/watermarked/public/spaceship1_1.png';
  this.data.sizeX = '60px';
  this.data.sizeY = '60px';
  this.data.rOffset = -90;
};
var laserBlast = function() {
  object.call(this);
  this.data.icon = 'http://memberfiles.freewebs.com/37/52/64535237/photos/Sharing-Sprites/redLaserRay.png';
  this.data.sizeX = '30px';
  this.data.sizeY = '30px';
  this.data.maxAge = 200;
};
function wsOpen(){
  ws = new WebSocket('ws://achex.ca:4010');
  ws.onmessage = function(evt){
    var st_received_message = evt.data;
    console.log('Received:'+ st_received_message);
    var received_message = JSON.parse(st_received_message);
    if (received_message.mess != undefined && received_message.sID != sId) {
      if (received_message.mess.join) {
        ships[received_message.sID] = new SpaceShip(); ships[received_message.sID].draw(); ships[received_message.sID].move(received_message.mess.x,received_message.mess.y); ships[received_message.sID].rotate(received_message.mess.r); ships[received_message.sID].vx = received_message.mess.vx;ships[received_message.sID].vy = received_message.mess.vy;
        if(received_message.mess.newS){
          ws.send(JSON.stringify({'toS': received_message.sID, 'mess':{'join': true,'x': ships[sId].x,'y': ships[sId].y, 'r': ships[sId].r, 'vx':ships[sId].vx, 'vy':ships[sId].vy, 'newS':false}}));
        }
      }
      if (received_message.mess.vx != undefined && received_message.mess.join == undefined) {
        ships[received_message.sID].vx = received_message.mess.vx; ships[received_message.sID].vy = received_message.mess.vy;
      }
      if (received_message.mess.r != undefined && received_message.mess.join == undefined) {
        ships[received_message.sID].rotate(received_message.mess.r);
      }
      if (received_message.mess.shoot) {
        var _i = lasers.push(new laserBlast) - 1; lasers[_i].draw();lasers[_i].move(ships[received_message.sID].x,ships[received_message.sID].y); lasers[_i].rotate(ships[received_message.sID].r); lasers[_i].vSet(5);
      }
    }
    if (received_message.SID != undefined) {
      sId = received_message.SID;
      ships[sId] = new SpaceShip();ships[sId].draw(); ships[sId].move(1,1);
      send({'join': true,'x': 1,'y': 1, 'r':0, 'vx':0, 'vy':0, 'newS':true});
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
var send = function(mess){
  var message = {};
  message.to = "Spaceship-Game-Sv1";
  message.mess = mess;
  message = JSON.stringify(message);
	ws.send(message);
}
var main = function() {
  if (keyMap[38]) {ships[sId].vSet(.01); send({'vx': ships[sId].vx, 'vy': ships[sId].vy});}
  if (keyMap[39]) {ships[sId].rotate(1, true); send({'r': ships[sId].r});}
  if (keyMap[37]) {ships[sId].rotate(-1, true); send({'r': ships[sId].r});}
  if (keyMap[32] && lsDe == 0) {lsDe = 50; var _i = lasers.push(new laserBlast) - 1; lasers[_i].draw();lasers[_i].move(ships[sId].x,ships[sId].y); lasers[_i].rotate(ships[sId].r); lasers[_i].vSet(5); send({'shoot': true});}
  lsDe = (lsDe == 0) ? lsDe: lsDe - 1;
  ships.forEach(function(a){a.tick()});
  lasers.forEach(function(a, b){if(a.tick()){a.remove(); lasers.splice(b, 1);}});
  lasers.forEach(function(a, b){ships.forEach(function(c, d) { if (a.x < c.x + c.data.sizeX.replace('px', '') && a.x + a.data.sizeX.replace('px', '') > c.x && a.y < c.y + c.data.sizeY.replace('px', '') && a.data.sizeX.replace('px', '') + a.y > c.y && a.age > 3) {a.remove(); lasers.splice(b, 1);c.remove(); ships.splice(d, 1);}})});
};
onkeydown = onkeyup = function(e){
  e = e || event; // to deal with IE
  keyMap[e.keyCode] = e.type == 'keydown';
  //console.log(map);
};
var loop = setInterval(function(){main()}, 1);
