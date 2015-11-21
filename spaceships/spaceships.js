//
var ws;
var sId;
var keyMap = [];
var ships = [];
var lasers = [];
var myLasers = [];
var lsDe = 0;
var tick = 0;
var lasersNum = 0;
var object = function() {
  this.data = {
    'icon': undefined,
    'sizeX': undefined,
    'sizeY': undefined,
    'vLoss': 0,
    'rOffset': 0,
    'maxAge': undefined,
    'maxHelth': undefined,
    'text': undefined,
    'topSpeed': undefined, 
    'oncollision': undefined
  };
  this.x = 0;
  this.y = 0;
  this.r = 0;
  this.vx = 0;
  this.vy = 0;
  this.age = 0;
  this.helth = 0;
  this.draw = function(x, y) {
    this.x = x;
    this.y = y;
    this.selfI = document.createElement("div");
    this.selfI.style.width = this.data.sizeX;
    this.selfI.style.height = this.data.sizeY;
    this.selfI.style.position = 'absolute'
    this.selfI.style.top = this.y + 'px';
    this.selfI.style.left = this.x + 'px';
    document.body.appendChild(this.selfI);
    this.img = document.createElement("img");
    this.img.src = this.data.icon;
    this.img.style.width = this.data.sizeX;
    this.img.style.height = this.data.sizeY;
    this.img.style.webkitTransform = "rotate("+-90+"deg)";
    this.selfI.appendChild(this.img);
    if (this.data.text != undefined){
      this.selfI.innerHTML = this.selfI.innerHTML + '</br>'
      this.div = document.createElement("div");
      this.div.innerHTML = this.data.text;
      this.selfI.appendChild(this.div);
    }
  };
  this.remove = function(){
    document.body.removeChild(this.selfI);
  };
  this.move = function(x, y, type) {
    this.x = (type) ? (this.x + x): x;
    this.y = (type) ? (this.y + y): y;
    if (this.x < 0){this.x = 0; this.helth += -this.vx * 10; this.vx = 0;}
    if (this.y < 0){this.y = 0; this.helth += -this.vy * 10; this.vy = 0;}
    if (this.x > 2000){this.x = 2000; this.helth += this.vx * 10; this.vx = 0;}
    if (this.y > 2000){this.y = 2000; this.helth += this.vy * 10; this.vy = 0;}
    this.selfI.style.top = this.y + 'px';
    this.selfI.style.left = this.x + 'px';
  };
  this.rotate = function(r, type) {
    this.r = (type) ? (this.r + r): r;
    this.selfI.children.item(0).style.webkitTransform = "rotate("+(this.r + this.data.rOffset)+"deg)";
    return this.r;
  };
  this.vSet = function(power) {
    if (Math.sqrt(Math.pow(power*Math.cos(this.r*0.0174533) + this.vx, 2) + Math.pow(power*Math.sin(this.r*0.0174533) + this.vy, 2)) < this.data.topSpeed && Math.sqrt(Math.pow(power*Math.cos(this.r*0.0174533) + this.vx, 2) + Math.pow(power*Math.cos(this.r*0.0174533) + this.vx, 2)) > 0 - this.data.topSpeed) {
      this.vx += power*Math.cos(this.r*0.0174533);
      this.vy += power*Math.sin(this.r*0.0174533);
    }
  };
  this.tick = function() {
    this.vx = this.vx- this.data.vLoss;
    this.vy = this.vy- this.data.vLoss;
    this.move(this.vx, this.vy, true);
    if (this.age%50 == 0) {
      this.helth = (this.helth > 0) ? (this.helth - .1): this.helth;
      this.helth = (this.helth < 0) ? 0: this.helth;
    }
    //console.log(this.age);
    this.age++;
    if (this.data.text == 'helth'){
    	this.selfI.children.item(2).innerHTML = +((this.data.maxHelth - this.helth)/this.data.maxHelth * 100).toFixed(2)  + "%"
    }
    if (this.helth >= this.data.maxHelth && this.data.maxHelth != undefined){
    	return true;
    }
    if (this.age >= this.data.maxAge && this.data.maxAge != undefined){
    	return true;
    }
  };
};
//
var SpaceShip = function() {
  object.call(this);
  this.data.icon = 'http://opengameart.org/sites/default/files/styles/watermarked/public/spaceship1_1.png';
  //this.data.icon = 'www.isd624.org/graphics/thumbnails//LovettThumbnail.jpg';
  this.data.sizeX = '60px';
  this.data.sizeY = '60px';
  this.data.rOffset = -90;
  this.data.maxHelth = 200;
  this.data.text = 'helth';
  this.data.topSpeed = 2.5;
};
var laserBlast = function() {
  object.call(this);
  this.data.icon = 'http://memberfiles.freewebs.com/37/52/64535237/photos/Sharing-Sprites/redLaserRay.png';
  this.data.sizeX = '30px';
  this.data.sizeY = '30px';
  this.data.maxAge = 200;
  this.owner = null;
  this.data.topSpeed = 10;
  this.data.oncollision = function(a, b){
    ships[sId].helth += 20;
    a.remove();
    lasers.splice(b, 1);
    send({'helth': true, 'helthLv': ships[sId].helth});
    console.log('test1');
  }
};  
  var metal = function() {
  object.call(this);
  this.data.icon = 'http://images.clipartpanda.com/dot-com-clipart-dot-clipart-8e5a5a7ed9284c00a7bc45f2ad1ea8e8VPJ1OJ.png';
  this.data.sizeX = '20px';
  this.data.sizeY = '20px';
  this.data.maxAge = 1000;
  this.owner = null;
  this.data.topSpeed = 0;
  this.data.oncollision = function(a, b){
    a.remove();
    lasers.splice(b, 1);
    send({'remove': true, 'listId': b});
  };
  
};
function wsOpen(){
  ws = new WebSocket('ws://achex.ca:4010');
  ws.onmessage = function(evt){
    var st_received_message = evt.data;
    //console.log('Received:'+ st_received_message);
    var received_message = JSON.parse(st_received_message);
    if (received_message.mess != undefined && received_message.sID != sId) {
      if (received_message.mess.join) {
        ships[received_message.sID] = new SpaceShip(); ships[received_message.sID].draw(); ships[received_message.sID].move(received_message.mess.x,received_message.mess.y); ships[received_message.sID].rotate(received_message.mess.r); ships[received_message.sID].vx = received_message.mess.vx;ships[received_message.sID].vy = received_message.mess.vy;
        lasers[received_message.sID] = [];
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
        var laser = lasers[received_message.sID]; var _i = laser.push(new laserBlast) - 1; laser[_i].draw(); laser[_i].owner = received_message.sID; laser[_i].move(ships[received_message.sID].x,ships[received_message.sID].y); laser[_i].rotate(ships[received_message.sID].r); laser[_i].vSet(5);
      }
      if (received_message.mess.death) {
        death(received_message.sID);
      }
      if (received_message.mess.remove) {
        lasers[received_message.sID][received_message.mess.listId].remove(); lasers.splice(received_message.mess.listId, 1);
      }
      if (received_message.mess.update) {
        ships[received_message.sID].vx = received_message.mess.vx; ships[received_message.sID].vy = received_message.mess.vy; ships[received_message.sID].rotate(received_message.mess.r); ships[received_message.sID].move(received_message.mess.x, received_message.mess.y)
      }
      if(received_message.mess.helth){
      	ships[received_message.sID].helth = received_message.mess.helthLv;
      }
    }
    if (received_message.SID != undefined) {
      sId = received_message.SID;
      ships[sId] = new SpaceShip();ships[sId].draw(); ships[sId].move(1,1);
      lasers[sId] = [];
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
var death = function(shipID) {
  ships[shipID].move(1,1);
  ships[shipID].rotate(0);
  ships[shipID].vx = 0;
  ships[shipID].vy = 0;
  ships[shipID].helth = 0;
}
var main = function() {
  tick++;
  if (keyMap[38]) {ships[sId].vSet(.01); /*send({'vx': ships[sId].vx, 'vy': ships[sId].vy});*/}
  if (keyMap[39]) {ships[sId].rotate(1, true); /*send({'r': ships[sId].r});*/}
  if (keyMap[37]) {ships[sId].rotate(-1, true); /*send({'r': ships[sId].r});*/}
  if (keyMap[32] && lsDe == 0) {lsDe = 50;lasers[sId][lasersNum] = new laserBlast; lasers[sId][lasersNum].draw();lasers[sId][lasersNum].owner = sId; lasers[sId][lasersNum].move(ships[sId].x,ships[sId].y); lasers[sId];lasers[sId][lasersNum].rotate(ships[sId].r); lasers[sId][lasersNum].vSet(5); send({'shoot': true, 'LaserID': lasersNum}); lasersNum++;}
  lsDe = (lsDe == 0) ? lsDe: lsDe - 1;
  ships.forEach(function(a, b){if(a.tick()){send({'death': true});death(b)}});
  lasers.forEach(function(a){a.forEach(function(b, c){if(b.tick()){b.remove(); a.splice(c, 1);}})});
  lasers.forEach(function(c){c.forEach(function(a, b){
      if (a.x < ships[sId].x + parseInt(ships[sId].data.sizeX.replace('px', '')) &&
      a.x + parseInt(a.data.sizeX.replace('px', '')) > ships[sId].x &&
      a.y < ships[sId].y + parseInt(ships[sId].data.sizeY.replace('px', '')) &&
      a.y + parseInt(a.data.sizeY.replace('px', '')) > ships[sId].y &&
      a.owner != sId) {
        console.log('test1');
        a.data.oncollision(a, b);
      }
    })
  }
  window.scrollTo(ships[sId].x - window.innerWidth / 2, ships[sId].y - window.innerHeight / 2);
  //if (tick%1000 == 0) {
    send({'update': true,'x': ships[sId].x,'y': ships[sId].y, 'r': ships[sId].r, 'vx':ships[sId].vx, 'vy':ships[sId].vy})
  //}
};
onkeydown = onkeyup = function(e){
  e = e || event; // to deal with IE
  keyMap[e.keyCode] = e.type == 'keydown';
  //console.log(map);
  return false;
};
var loop = setInterval(function(){main()}, 1);
