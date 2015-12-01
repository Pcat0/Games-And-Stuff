var x = 0;
var y = 0;
var height = screen.height;
var width = screen.width;
var blockX = Math.ceil(width / 50);
var blockY = Math.ceil(height / 50);
var items = [];
var index = {};
var tool = 'hammer';
var gravity = .5;
var boxSize = 30;
var target;
var repair = [false, 0, 0];
var s=document.createElement('script');s.setAttribute("type","text/javascript");s.setAttribute("src", 'https://Pcat0.github.io/utilities/scriptLoader.js');document.body.appendChild(s);
var stats = document.createElement('div');
document.body.style.margin = '0px';
stats.style.right= '5px';
stats.style.bottom= '5px';
stats.style.position= 'fixed';
var updateStats = function(){
  stats.innerHTML= 'Gravity: ' + ((gravity === 0) ? 'off': 'on') + '</br>' + 'Tool: ' + tool;
}
updateStats();
s.onload = function(){
LOADJS('keyCodes', false, function() {onkeydown = function(e){
  if(keyCodes[e.keyCode] === 'h'){tool = 'hammer'; boxSize = 30;updateStats();}
  if(keyCodes[e.keyCode] === 'b'){tool = 'bomb'; boxSize = 60;updateStats();}
  if(keyCodes[e.keyCode] === 'g'){gravity = (gravity === 0) ? .5: 0;updateStats();}
}});
LOADJS('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js', true, function(){html2canvas(document.body, {onrendered: function(canvas) {
  document.body.innerHTML = "";
  document.body.style.backgroundColor = 'lightgrey';
    while ((y + 1) * blockY < height) {
      while ((x + 1) * blockX < width){
        ctx = canvas.getContext("2d");
        var squ = document.createElement('canvas');
        squ.width = blockX;
        squ.height = blockY;
        squ.style.top = y * blockY + 'px';
        squ.style.left = x * blockX + 'px';
        squ.style.position = 'absolute';
        squ.id = x + ',' + y;
        squ.getContext("2d").putImageData(ctx.getImageData(x * blockX,y * blockY,(x + 1) * blockX,(y + 1) * blockY), 0, 0);
        document.body.appendChild(squ);
        x++;
      }
      x = 0;
      y++;
    }
    var all;
    setInterval(function(){items.forEach(function(a){a.tick()})}, 5);
    setInterval(tick() , 5);
    alert('Page Destroyer loaded.');
    document.body.appendChild(stats);
    onmousedown = function(e) {
      if (repair == 'repair') {
        var repair[0] = true;
        var repair[1] = e.pageX;
        var repair[2] = e.pageY;
      }
    }
    onclick = function(e) {
    var i = 0;
    var all = document.getElementsByTagName("canvas");
    if (tool == 'repair') {
    }
    while (i < all.length && (tool == 'hammer' || tool == 'bomb')) {
      if (typeof all[i] !== 'undefined') {
        var box = all[i].getBoundingClientRect();
        if (box.left < (e.x + boxSize) && (box.left + box.width) > (e.x - boxSize) && box.top < (e.y + boxSize) && (box.top + box.height) > (e.y - boxSize)) {
            //document.body.removeChild(all[i]);
            all[i].style.zIndex = '9001';
            var _i = items.push(new move(all[i])) - 1;
            index[all[i].id] = _i;
              items[_i] = new move(all[i]);
              items[_i].setUp();
              items[_i].r = Math.atan2(box.top - e.y,box.left - e.x) * 180 / Math.PI;
              if (tool == 'hammer'){
                items[_i].vSet(6);
              }
              if (tool == 'bomb'){
                items[_i].vSet(14);
                }
              }
            }
          i++;
        }
      }
    }
  });});
  }
  var move = function(item) {
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.vx = 0;
    this.vy = 0;
    this.data = {
      'vLoss': 0
    };
    this.tick = function() {
      this.vx = this.vx- this.data.vLoss;
      this.vy = this.vy- this.data.vLoss + gravity;
      this.move(this.vx, this.vy, true);
    };
    this.vSet = function(power) {
      this.vx += power*Math.cos(this.r*0.0174533);
      this.vy += power*Math.sin(this.r*0.0174533);
     };
     this.rotate = function(r, type) {
      this.r = (type) ? (this.r + r): r;
      item.style.webkitTransform = "rotate("+(this.r + this.data.rOffset)+"deg)";
      return this.r;
     };
     this.setUp = function(){
       this.x = parseInt(item.style.left.split('p')[0]);
       this.y = parseInt(item.style.top.split('p')[0]);
     };
    this.move = function(x, y, type) {
      this.x = (type) ? (this.x + x): x;
      this.y = (type) ? (this.y + y): y;
      item.style.top = this.y + 'px';
      item.style.left = this.x + 'px';
      if (this.x < 0){this.x = 0; this.vx = 0;}
      if (this.y < 0){this.y = 0; this.vy = 0;}
      if (this.x > width){this.x = width; this.vx = 0;}
      if (this.y > height){this.y = height; this.vy = 0;}
    };
  };
}
var tick = function() {
  if repair[0] {
    var target = items[index[Math.floor(repair[1]/blockX) + ',' + Math.floor(repair[2]/blockY)]];
    console.log(index[Math.floor(repair[1]/blockX) + ',' + Math.floor(repair[2]/blockY)]);
    target.r = Math.atan2(target.x - repair[2],target.y - repair[1]) * 180 / Math.PI;
    target.vSet((target.r == Math.abs(target.r)) ? -6 : 6);
  }
}
