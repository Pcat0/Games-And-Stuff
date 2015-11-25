var x = 0;
var y = 0;
var height = screen.height;
var width = screen.width;
var blockX = Math.ceil(width / 50);
var blockY = Math.ceil(height / 50);
document.body.style.margin = '0px';
var items = [];
var tool = 'hammer';
var gravity = .5;
/*
var s=document.createElement('script');s.setAttribute("type","text/javascript");s.setAttribute("src", 'https://Pcat0.github.io/utilities/scriptLoader.js');document.body.appendChild(s);
s.onload = function(){
  LOADJS('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js', true, onLoad());
  LOADJS('keyCodes');
}
*/
var s=document.createElement('script');s.setAttribute("type","text/javascript");s.setAttribute("src", 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js');document.body.appendChild(s);
s.onload = function(){
html2canvas(document.body, {onrendered: function(canvas) {
  document.body.innerHTML = "";
  document.body.style.backgroundColor = 'lightgrey';
    while (y < height) {
      while (x < width){
        ctx = canvas.getContext("2d");
        var squ = document.createElement('canvas');
        squ.width = blockX;
        squ.height = blockY;
        squ.style.top = y + 'px';
        squ.style.left = x + 'px';
        squ.style.position = 'absolute';
        squ.getContext("2d").putImageData(ctx.getImageData(x,y,x+blockX,y+blockY), 0, 0);
        document.body.appendChild(squ);
        x += blockX;
      }
      x = 0;
      y += blockY;
    }
    var boxSize = 30;
    var all;
    setInterval(function(){items.forEach(function(a){a.tick()})}, 5);
    onclick = function(e) {
    var i = 0;
    var all = document.getElementsByTagName("canvas");
      while (i < all.length) {
      if (typeof all[i] !== 'undefined') {
        var box = all[i].getBoundingClientRect();
        if (box.left < (e.x + boxSize) && (box.left + box.width) > (e.x - boxSize) && box.top < (e.y + boxSize) && (box.top + box.height) > (e.y - boxSize)) {
            //document.body.removeChild(all[i]);
            all[i].style.zIndex = '9001';
            var _i = items.push(new move(all[i])) - 1;
            items[_i].setUp();
            items[_i].r = Math.atan2(box.top - e.y,box.left - e.x) * 180 / Math.PI;
            if (tool = 'hammer'){
              items[_i].vSet(6);
            }
          }
          
        }
      i++;
      }
    }
  }
});
};
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
